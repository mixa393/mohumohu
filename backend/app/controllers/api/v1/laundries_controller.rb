class Api::V1::LaundriesController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_laundry, only: [:show, :update, :destroy, :washed]

  # statusと、チームに所属する洗濯物全てについてデータをjsonで返却する
  # @return [json] status,data = {id: 洗濯物ID, name: 洗濯物名, image: 画像, weekly: その週の洗濯する日か否かの配列}
  def index
    laundries = Laundry.where(deleted_at: nil,
                              team_id: current_api_v1_user.team.id)
    data = []

    laundries.each do |laundry|
      data.push({ id: laundry.id,
                  name: laundry.name,
                  image: laundry.image,
                  weekly: weekly(laundry)
                }
      )
    end

    render json: { status: 200, data: data }
  end

  # ある洗濯物について、今日を含む1週間の中で洗濯する日orその前後の日を数字で返却する
  # index内で呼び出す
  # 洗濯する日:2, その前後の日:1, それ以外の日:0
  # 要素数7
  # 返却例: [0, 0, 1, 2, 1, 0, 0, 0]
  # @return [Array] integer
  # @params [Object] laundry
  def weekly(laundry)
    week_data = []
    today = Time.now.to_date

    (0...7).each { |day|
      week_data.push(wash_day_type(today + day, laundry))
    }

    week_data
  end

  # 日付と比較して2,1,0のいずれかを返す
  # 洗濯する日 = 2, その前後の日 = 1, それ以外の日 = 0
  # @param [Date] day
  # @param [Object] laundry
  # @return [Integer] 2 or 1 or 0
  def wash_day_type(day, laundry)
    wash_at = laundry.wash_at

    # 順々に渡される日付が洗濯日と比較
    case day

      # 洗濯する日は 2
    when wash_at #洗濯日
      2
    when wash_at + laundry.days #洗濯日+洗濯期間の日
      2
    when wash_at + 2 * laundry.days #洗濯日+2*洗濯期間の日
      2

      # 洗濯する日の前後は 1
    when wash_at + 1, wash_at - 1 #洗濯日前後
      1
    when wash_at + laundry.days + 1, wash_at + laundry.days - 1 #洗濯日+洗濯期間 前後の日
      1
    when wash_at + 2 * laundry.days + 1, wash_at + 2 * laundry.days - 1 #洗濯日+2*洗濯期間 前後の日
      1

      # それ以外の日は 0
    else
      0
    end
  end

  # 現在から3日以内にwash_atが来る洗濯物一覧を取得
  # @return [json] status,data = {id: 洗濯物ID, name: 洗濯物名, image: 画像, limit: 洗濯日まであと何日か}
  def list
    today = Time.now.to_date
    yesterday = Time.current.yesterday #バッチ処理未完成のため一時的に表記
    three_days_later = today + 3
    data = []

    # wash_atが今から3日以内のもののみを検索
    laundries = Laundry.where(deleted_at: nil,
                              team_id: current_api_v1_user.team_id)
                       .where("wash_at <= ?", three_days_later)
                       .where("wash_at > ?", yesterday) #バッチ処理未完成のため過去の表示を消すために一時的に表記
                       .order(id: :desc, wash_at: :asc)

    # フォーマット化してdataに入れる
    laundries.each do |laundry|
      data.push({ id: laundry.id,
                  name: laundry.name,
                  image: laundry.image,
                  limit_days: (laundry.wash_at - today).to_i
                }
      )
    end

    render json: { status: 200, data: data }
  end

  def show
    render json: { status: 200, data: @laundry }
  end

  # 「洗濯した」用のメソッド
  # wash_atを今日からdays日後に更新
  # @params [Integer] laundry_id,リクエストボディから取得
  # @return [json] 更新後wash_at(XX月YY日に変換)
  def washed
    today = Time.now.to_date

    if @laundry.update(wash_at: today + @laundry.days)
      render json: { status: 200, data: @laundry.wash_at.strftime("%m月%d日") }
    else
      render json: { status: 400, data: @laundry.errors }
    end
  end

  def create
    # ユーザーIDとチームIDはトークンから用意
    ids = { user_id: current_api_v1_user.id, team_id: current_api_v1_user.team_id }

    # 送られてきたパラメータに用意したものを混ぜる
    params = laundry_params.merge(ids)

    laundry = Laundry.new(params)
    if laundry.save
      render json: { status: 200, data: laundry }
    else
      render json: { status: 400, message: "Laundryの作成に失敗しました", data: laundry.errors }
    end
  end

  def update
    if @laundry.update(laundry_params)
      render json: { status: 200, data: @laundry }
    else
      render json: { status: 400, data: @laundry.errors }
    end
  end

  # 論理削除
  def destroy
    if @laundry.update(deleted_at: Time.now)
      render json: { status: 200, data: @laundry }
    else
      render json: { status: 400, message: "Laundryの削除に失敗しました", data: @laundry.errors }
    end
  end

  private

  def set_laundry
    begin
      # 自分のチームに所属する洗濯物のみを取得可能
      @laundry = Laundry.where(deleted_at: nil, team_id: current_api_v1_user.team_id).find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { status: 400, message: "データの取得に失敗しました" }
    end
  end

  def laundry_params
    params.permit(:name, :description, :days, :notice, :wash_at, :deleted_at)
  end
end
