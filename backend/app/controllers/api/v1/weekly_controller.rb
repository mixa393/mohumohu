class Api::V1::WeeklyController < ApplicationController
  before_action get_laundries

  def index
    render json: { status: 200, data: @laundries }
  end

  def get_laundries
    @laundries = Laundry.find_by_team_id(params[:team_id])
  end
end
