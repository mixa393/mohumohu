class ApplicationController < ActionController::API
  helper_method :login!, :login?, :remember, :current_user, :current_team
  before_action :check_xhr_header

  # セッションを使用してユーザーログイン
  def login!(user)
    session[:user_id] = user.id
    session[:team_id] = user.team_id
  end

  # ログインしているか否かを返却
  def login?
    !@current_user.nil?
  end

  # ユーザーを永続的セッションに記憶する
  def remember(user)
    user.remember
    # 20年の期限で署名付きクッキーを保存
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # ログイン中のユーザーを取得するインスタンス変数
  def current_user
    if session[:user_id]
      @current_user ||= User.find_by(id: session[:user_id])

    elsif cookies.signed[:user_id]
      user = User.find_by(id: cookies.signed[:user_id])

      if user && user.authenticated?(cookies[:remember_token])
        @current_user = user
      end
    end
  end

  # チームを取得するインスタンス変数
  def current_team
    if session[:team_id]
      @current_team ||= Team.find_by(id: session[:team_id])

    elsif cookies.signed[:user_id]
      user = User.find_by(id: cookies.signed[:user_id])

      if user && user.authenticated?(cookies[:remember_token])
        @current_team = Team.find_by(id: user.team_id)
      end
    end
  end

  # 永続的セッションを破棄する
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end


  private

  def check_xhr_header
    return if request.xhr?
    render json: { error: 'forbidden' }, status: :forbidden
  end

end
