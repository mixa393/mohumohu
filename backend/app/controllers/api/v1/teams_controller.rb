class Api::V1::TeamsController < ApplicationController
  before_action :login?, only: [:show, :update, :destroy]
  before_action :set_team, only: [:show, :update, :destroy]

  def show
    render json: { status: 200, data: @team }
  end

  def create
    team = Team.new(team_params)

    if team.save
      render json: { status: 200, data: team }
    else
      render json: { status: 400, message: "Teamの作成に失敗しました", data: team.errors }
    end
  end

  def update
    if @team.update(team_params)
      render json: { status: 200, data: @team }
    else
      render json: { status: 400, data: @team.errors }
    end
  end

  # 論理削除
  def destroy
    if @team.update(deleted_at: Time.now)
      render json: { status: 200, data: @team }
    else
      render json: { status: 400, message: "Teamの削除に失敗しました" }
    end
  end

  private

  def set_team
    @team = Team.where(deleted_at: nil).find(@current_team.id)
  end

  def team_params
    params.permit(:name, :location_id)
  end
end
