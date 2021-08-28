class Api::V1::LaundriesController < ApplicationController
  before_action :set_laundry, only: [:show, :update, :destroy, :weekly]

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

  # 1週間のうち、洗濯する日=2、洗濯する日の前後=1を配列で返却する
  # フロントのマス目の色変化用
  def weekly
    week_data = []

    (0...7).each { |day|
      today = Time.now.to_date

      if @laundry.wash_at == today + day
        week_data.push(2)
      elsif @laundry.wash_at == today + day - 1 || @laundry.wash_at == today + day + 1
        week_data.push(1)
      else
        week_data.push(0)
      end
    }
    render json: { status: 200, data: week_data }
  end

  private

  def set_laundry
    @laundry = Laundry.find(params[:id])
  end

  def laundry_params
    params.permit(:name, :description, :days, :notice, :wash_at, :team_id, :user_id, :deleted_at)
  end
end
