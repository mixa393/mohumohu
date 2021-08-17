class Api::V1::TeamsController < ApplicationController
  before_action :set_team, only: [:show, :update, :destroy, :remove]

  def show
    render json: { status: 200, team: @team }
  end

  def create
    team = Team.new(team_params)

    if team.save
      render json: { status: 200, data: team }
    else
      render json: { status: 500, message: "Teamの作成に失敗しました", data: team.errors }
    end
  end

  def update
    if @team.update(team_params)
      render json: { status: 200, data: @team }
    else
      render json: { status: 500, data: @team.errors }
    end
  end

  # 物理削除
  def destroy
    if @team.destroy
      render json: { status: 200, data: @team }
    else
      render json: { status: 500, message: "Teamの削除に失敗しました" }
    end
  end

  # 論理削除
  def remove
    if @team.update(deleted_at: Time.now)
      render json: { status: 200, data: @team }
    else
      render json: { status: 500, message: "Teamの削除に失敗しました" }
    end
  end

  private

  def set_team
    @team = Team.find(params[:id])
  end

  def team_params
    params.permit(:name)
  end
end
