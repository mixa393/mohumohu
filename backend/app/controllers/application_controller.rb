class ApplicationController < ActionController::API
  before_action :check_xhr_header
  include ActionController::Cookies

  # devise_token_auth
  include DeviseTokenAuth::Concerns::SetUserByToken
  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?

  private

  def check_xhr_header
    return if request.xhr?
    render json: { error: 'forbidden' }, status: :forbidden
  end

end
