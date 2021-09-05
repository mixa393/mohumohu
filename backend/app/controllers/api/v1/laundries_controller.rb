class Api::V1::LaundriesController < ApplicationController
  before_action :login?
  before_action :set_laundry, only: [:show, :update, :destroy]

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
