class Api::V1::LaundryHistoriesController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :current_team, only: [:index, :show, :create]
  before_action :laundry_check, only: [:create,:show]

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
    if @laundry
      laundry_histories = LaundryHistory.where(deleted_at: nil, laundry_id: @laundry.id)
      render json: { status: 200, data: laundry_histories }
    end
  end

  # 洗濯履歴を作成
  # @params [Integer] id,リクエストボディから取得
  # @return [json] status,data(Array)
  def create
    laundry_history = LaundryHistory.new(user_id: current_api_v1_user.id, laundry_id: @laundry.id)

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
    begin
      laundry_history = LaundryHistory.where(deleted_at: nil, user_id: current_api_v1_user.id).find(params[:id])
    rescue ActiveRecord::RecordNotFound
      # IDが不正の場合messageだけ返却して抜ける
      render json: { status: 400, message: "削除できる履歴がありません" }
      return
    end

    if laundry_history.update(deleted_at: Time.now)
      render json: { status: 200, data: laundry_history }
    else
      render json: { status: 400, message: "履歴削除に失敗しました", data: laundry_history.errors }
    end
  end

  private

  # 現チーム、削除されていない洗濯物かどうかチェック
  # 洗濯物IDが不正の場合messageだけ返却して抜ける
  def laundry_check
    begin
      @laundry = Laundry.where(deleted_at: nil, team_id: current_api_v1_user.team_id).find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { status: 400, message: "データの取得に失敗しました" }
    end
  end
end
