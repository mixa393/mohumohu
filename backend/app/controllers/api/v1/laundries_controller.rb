class Api::V1::LaundriesController < ApplicationController
  before_action :set_laundry, only: [:show, :update, :destroy]

  def index
    # statusと、チームに所属する洗濯物全てについてデータをjsonで返却する
    # id: 洗濯物ID, name: 洗濯物の名前, week_data: その週の洗濯する日か否かの配列
    # @return [json] status,data

    # 返却例
    # { status:200,
    #   data:
    #     {id: 洗濯物ID, name: 洗濯物の名前, week_data: 配列},
    #     {id: 洗濯物ID, name: 洗濯物の名前, week_data: 配列}
    # }
    laundries = Laundry.where(team_id: params[:team_id])
    data = []

    laundries.each do |laundry|
      data.push({ id: laundry.id,
                  name: laundry.name,
                  image: laundry.image,
                  week_data: weekly(laundry)
                }
      )
    end

    render json: { status: 200, data: data }
  end

  def weekly(laundry)
    # ある洗濯物について、今日を含む1週間の中で洗濯する日orその前後の日を数字で返却する
    # index内で呼び出す
    # @return [Array] integer
    # 洗濯する日:2, その前後の日:1, それ以外の日:0
    # 要素数7
    # 返却例: [0, 0, 1, 2, 1, 0, 0, 0]

    week_data = []

    (0...6).each { |day|
      today = Time.now.to_date

      if laundry.wash_at == today + day
        week_data.push(2)
      elsif laundry.wash_at == today + day - 1 || laundry.wash_at == today + day + 1
        week_data.push(1)
      else
        week_data.push(0)
      end
    }

    week_data
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
    @laundry = Laundry.find(params[:id])
  end

  def laundry_params
    params.permit(:name, :description, :days, :notice, :wash_at, :team_id, :user_id, :deleted_at)
  end
end
