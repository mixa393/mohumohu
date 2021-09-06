class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :check_xhr_header
  include ActionController::Cookies


  # セッション用の記述 ここから
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

  # セッション用の記述 ここまで

  private

  def check_xhr_header
    return if request.xhr?
    render json: { error: 'forbidden' }, status: :forbidden
  end

end
