class Api::V1::LaundryHistoriesController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :current_team, only: [:index, :show]

  #ユーザーの所属しているチームに属する洗濯物の履歴を全件取得する
  # @return [json] status,data(Array)
  def index
    laundry_histories = []

    # 所属チームの洗濯物を取得
    laundries = Laundry.where(deleted_at: nil, team_id: @current_team.id)

    # 所属チームの洗濯物の履歴を全件表示
    laundries.each { |laundry|
      laundry_history = LaundryHistory.where(deleted_at: nil, laundry_id: laundry.id)
      laundry_histories << laundry_history
    }

    render json: { status: 200, data: laundry_histories.flatten }
  end

  # １件の洗濯物についての履歴を取得
  # @params [Integer] laundry_id,URLから取得
  # @return [json] status,data(Array)
  def show
    # URLからIDを取得
    laundry_id = params[:id].to_i

    # 同チームに属する洗濯物一覧を取得
    laundries = Laundry.where(deleted_at: nil, team_id: @current_team.id)

    # 同チームの洗濯物一覧のIDを配列にする
    laundry_ids = []
    laundries.each do |laundry|
      laundry_ids << laundry.id
    end

    # 洗濯物IDが洗濯物一覧のいずれかのIDと合致したら値を返す
    if laundry_ids.include?(laundry_id)
      laundry_histories = LaundryHistory.where(deleted_at: nil, laundry_id: params[:id])
      render json: { status: 200, data: laundry_histories }
    else
      render json: { status: 400, message: "洗濯履歴取得に失敗しました" }
    end
  end

  # 洗濯履歴を作成
  # @params [Integer] laundry_id,リクエストボディから取得
  # @return [json] status,data(Array)
  def create
    laundry_history = LaundryHistory.new(user_id: current_api_v1_user.id, laundry_id: params[:laundry_id])

    if laundry_history.save
      render json: { status: 200, data: laundry_history }
    else
      render json: { status: 400, message: "洗濯履歴作成に失敗しました", data: laundry_history.errors }
    end
  end

  # 洗濯履歴を論理削除
  # 削除できるのは自分で洗濯したもののみ
  # @params [Integer] laundry_history_id, URLから取得
  # @return [json] status,data
  def destroy
    laundry_history = LaundryHistory.where(deleted_at: nil, user_id: current_api_v1_user.id).find(params[:id])

    if laundry_history.update(deleted_at: Time.now)
      render json: { status: 200, data: laundry_history }
    else
      render json: { status: 400, message: "履歴削除に失敗しました", data: laundry_history.errors }
    end
  end
end
