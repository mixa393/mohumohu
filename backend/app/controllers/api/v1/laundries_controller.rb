class Api::V1::LaundriesController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_laundry, only: [:show, :update, :destroy, :washed, :un_washed]

  # statusと、チームに所属する洗濯物全てについてデータをjsonで返却する
  # @return [json] status,data = {id: 洗濯物ID, name: 洗濯物名, image: 画像, weekly: その週の洗濯する日か否かの配列}
  def index
    laundries = Laundry.valid.where(team_id: current_api_v1_user.team_id)
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
    days = laundry.days || 0
    wash_at = laundry.wash_at
    today = Time.now.to_date
    weekly = []

    # 洗濯日当日
    on_the_day = []
    (0..6).each do |n|
      on_the_day.push(wash_at + n * days)
    end

    # 洗濯日前後の日
    days_before_and_after = []
    (0..6).each do |n|
      days_before_and_after.push(wash_at + n * days + 1)
      days_before_and_after.push(wash_at + n * days - 1)
    end

    # 1週間の日付を比較して数字を返す
    (0...7).each { |n|
      if on_the_day.include?((today + n))
        weekly.push(2)
      elsif days_before_and_after.include?((today + n))
        weekly.push(1)
      else
        weekly.push(0)
      end
    }

    weekly
  end

  def show
    render json: { status: 200, data: @laundry }
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
      render json: { status: 400, message: "洗濯物の作成に失敗しました", data: laundry.errors }
    end
  end

  def update
    if @laundry.update(laundry_params)
      render json: { status: 200, data: @laundry }
    else
      render json: { status: 400, message: "洗濯物の更新に失敗しました", data: @laundry.errors }
    end
  end

  # 論理削除
  def destroy
    if @laundry.update(deleted_at: Time.now)
      render json: { status: 200, data: @laundry }
    else
      render json: { status: 400, message: "洗濯物の削除に失敗しました", data: @laundry.errors }
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
    laundries = Laundry.valid
                       .where(team_id: current_api_v1_user.team_id)
                       .recent(yesterday, three_days_later)

    # フォーマット化してdataに入れる
    laundries.each do |laundry|

      # 今日の洗濯履歴がある時はループを飛ばす(dataに含めない)
      next if washed_today?(laundry)

      data.push({ id: laundry.id,
                  name: laundry.name,
                  image: laundry.image,
                  is_displayed: laundry.is_displayed,
                  limit_days: (laundry.wash_at - today).to_i
                }
      )
    end

    render json: { status: 200, data: data }
  end

  # 今日洗濯した履歴があるか否かを返却
  # @params [Object] laundry
  # @return [boolean] true or false
  def washed_today?(laundry)
    today = Time.now.to_date

    # 最近の洗濯履歴を検索
    recent_laundry_history = LaundryHistory.valid
                                           .where(laundry_id: laundry.id)
                                           .order(created_at: :desc)
                                           .first

    # 履歴がない場合falseを返して抜ける
    unless recent_laundry_history
      return false
    end

    # ある場合はその日付を抽出
    recent_wash_day = recent_laundry_history.created_at.to_date

    # 最新の履歴の日付が今日ならtrue,違うならfalseを返却
    if recent_wash_day == today
      true
    else
      false
    end
  end

  # 「洗濯した」用のメソッド
  # wash_atを今日からdays日後に更新 & is_displayedをfalseに変更
  # @params [Integer] laundry_id,リクエストボディから取得
  # @return [json] 更新後wash_at(XX月YY日に変換)
  def washed
    today = Time.now.to_date

    if @laundry.update(wash_at: today + @laundry.days,
                       is_displayed: false)
      render json: { status: 200, data: @laundry.wash_at.strftime("%m月%d日") }
    else
      render json: { status: 400, message: "洗濯日の更新に失敗しました", data: @laundry.errors }
    end
  end

  # 「今日は洗濯しない」用のメソッド
  # is_displayedをfalseに変更
  # @params [Integer] laundry_id,リクエストボディから取得
  # @return [json]
  def un_washed
    update_params = { is_displayed: false }

    # wash_atが今日だったら明日に入れ替える
    if @laundry.wash_at == Time.now.to_date
      update_params.store("wash_at", Time.current.tomorrow.to_date)
    end

    if @laundry.update(update_params)
      render json: { status: 200, data: @laundry }
    else
      render json: { status: 400, message: "洗濯日の更新に失敗しました", data: @laundry.errors }
    end
  end

  private

  def set_laundry
    begin
      # 自分のチームに所属する洗濯物のみを取得可能
      @laundry = Laundry.valid
                        .where(team_id: current_api_v1_user.team_id)
                        .find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { status: 400, message: "洗濯物データの取得に失敗しました" }
    end
  end

  def laundry_params
    params.permit(:name, :description, :days, :notice, :wash_at, :deleted_at)
  end
end
