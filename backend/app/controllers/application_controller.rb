class ApplicationController < ActionController::API
  before_action :check_xhr_header
  include ActionController::Cookies
  include SessionsHelper

  private

  def check_xhr_header
    return if request.xhr?
    render json: { error: 'forbidden' }, status: :forbidden
  end

end
