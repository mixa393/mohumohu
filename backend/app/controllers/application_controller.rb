class ApplicationController < ActionController::Base
  before_action :check_xhr_header
  skip_forgery_protection


  private

  def check_xhr_header
    return if request.xhr?

    render json: { error: 'forbidden' }, status: :forbidden
  end
end
