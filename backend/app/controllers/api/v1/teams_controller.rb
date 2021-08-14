class Api::V1::TeamsController < ApplicationController
  before_action :set_team, only: [:show, :update, :destroy]
  protect_from_forgery
  skip_before_action :verify_authenticity_token

  def show
    render json: { status: 200, team: @team }
  end

  def create
    team = Team.new(team_params)

    if team.save
      render json: { status: 200, team: team }
    else
      render json: { status: 500, message: "Teamの作成に失敗しました" }
    end
  end

  # def update
  #   if @team.update(team_params)
  #     render json: { status: 200, message: 'Updated the post', data: @team }
  #   else
  #     render json: { status: 500, message: 'Not updated', data: @team.errors }
  #   end
  # end
  #
  #
  # def destroy
  #   team = Team.find(params[:id])
  #
  #   if team.destroy
  #     render json: { status: 200, team: team }
  #   else
  #     render json: { status: 500, message: "Teamの削除に失敗しました" }
  #   end
  # end
  #

  private

  def set_team
    @team = Team.find(params[:id])
  end

  def team_params
    params.require(:team).permit(:name)
  end
end
