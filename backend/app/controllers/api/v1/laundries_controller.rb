class Api::V1::LaundriesController < ApplicationController
  before_action :set_laundry, only: [:show, :update, :destroy]

  # statusと、チームに所属する洗濯物全てについてデータをjsonで返却する
  # @return [json] status,data = {id: 洗濯物ID, name: 洗濯物名, image: 画像, weekly: その週の洗濯する日か否かの配列}
  # @param [Integer] team_id チームID
  def index
    laundries = Laundry.where(deleted_at: nil).where(team_id: params[:team_id])
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

  # def weekly(laundry)
  #   # [Date] 次に洗濯する日
  #   wash_at = laundry.wash_at
  #
  #   # [Integer] 洗濯までの日数
  #   wash_term_day = laundry.days
  #
  #   # [Date] 今日の日付
  #   now = Date.today
  #
  #   # [Date] 1週間最後の日付
  #   last_day_of_week = now + 1.week - 1
  #
  #   # ハッシュを1週間分作成
  #   # "今日の日付" => 0, "明日の日付" => 0, "明後日の日付" => 0, ...
  #   wash_day_schedules = {}
  #   7.times do |i|
  #     wash_day_schedules.store((now + i.days).to_s, 0)
  #   end
  #
  #   while true do
  #     # 洗濯日は2を代入
  #     wash_day_schedules[wash_at.to_s] = 2
  #
  #     # 前後の日は1を代入
  #     wash_day_schedules[(wash_at - 1).to_s] = 1
  #
  #     # 洗濯日+1日が1週間後を超えたら脱出
  #     wash_day_schedules[(wash_at + 1).to_s] = 1
  #
  #     # 次回洗濯日を算出
  #     wash_at = wash_at + wash_term_day.days
  #     break if wash_at > last_day_of_week
  #   end
  #
  #   # 日付のkeyを除き、数字のみの配列を返却
  #   wash_day_schedules.values
  # end

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

    when wash_at #洗濯日
      2
    when wash_at + laundry.days #洗濯日+洗濯期間の日
      2
    when wash_at + 2 * laundry.days #洗濯日+2*洗濯期間の日
      2

    when wash_at + 1, wash_at - 1 #洗濯日前後
      1
    when wash_at + laundry.days + 1, wash_at + laundry.days - 1 #洗濯日+洗濯期間 前後の日
      1
    when wash_at + 2 * laundry.days + 1, wash_at + 2 * laundry.days - 1 #洗濯日+2*洗濯期間 前後の日
      1

    else #それ以外の日
      0
    end
  end

  def show
    render json: { status: 200, data: @laundry }
  end

  def create
    laundry = Laundry.new(laundry_params)

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
    @laundry = Laundry.where(deleted_at: nil).find(params[:id])
  end

  def laundry_params
    params.permit(:name, :description, :days, :notice, :wash_at, :team_id, :user_id, :deleted_at)
  end
end
