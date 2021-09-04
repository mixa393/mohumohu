class ApplicationController < ActionController::API
  before_action :check_xhr_header

  helper_method :login!, :current_user

  # セッションを使用してユーザーログイン
  def login!
    session[:user_id] = @user.id
  end

  # ログイン中のユーザーを取得するインスタンス変数を定義
  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    end
  end

  private

  def check_xhr_header
    return if request.xhr?

    render json: { error: 'forbidden' }, status: :forbidden
  end
end
