class Api::V1::LaundryHistoriesController < ApplicationController

  #ユーザーの所属しているチームに属する洗濯物の履歴を全件取得する
  # @return [json] status,data
  def index
    laundry_histories = []

    # 所属チームの洗濯物を取得
    laundries = Laundry.where(deleted_at: nil, team_id: current_team.id)

    # 所属チームの洗濯物の履歴を全件表示
    laundries.each { |laundry|
      laundry_history = LaundryHistory.where(deleted_at: nil, laundry_id: laundry.id)
      laundry_histories << laundry_history
    }

    render json: { status: 200, data: laundry_histories }
  end

  # １件の洗濯物についての履歴を取得
  # @params [Integer] laundry_id
  # @return [json] status,data
  def show
    laundry_histories = LaundryHistory.where(deleted_at: nil, laundry_id: params[:laundry_id])
    render json: { status: 200, data: laundry_histories }
  end

  # 洗濯履歴を作成
  # @params [Integer] user_id,laundry_id
  # @return [json] status,data
  def create
    laundry_history = LaundryHistory.new(user_id: params[:user_id], laundry_id: params[:laundry_id])

    if laundry_history.save
      render json: { status: 200, data: laundry_history }
    else
      render json: { status: 400, message: "洗濯履歴作成に失敗しました", data: laundry_history.errors }
    end
  end

  # 洗濯履歴を論理削除
  # 削除できるのは自分で洗濯したもののみ
  # @params [Integer] user_id,laundry_id
  # @return [json] status,data
  def destroy
    laundry_history = LaundryHistory.where(deleted_at: nil, user_id: params[:user_id], laundry_id: params[:laundry_id])

    if laundry_history.update(deleted_at: Time.now)
      render json: { status: 200, data: laundry_history }
    else
      render json: { status: 400, message: "履歴削除に失敗しました", data: laundry_history.errors }
    end
  end
end
