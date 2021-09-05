class Api::V1::SessionsController < ApplicationController
  before_action :current_user, :current_team, only: [:logout]

  # ログイン処理
  # 入力したpassword/password_confirmationと、DBのpassword_digestの値を比較
  # 合致した場合にtrue
  def login
    user = User.where(deleted_at: nil).find_by(email: session_params[:email])
    remember user

    if user && user.authenticate(session_params[:password])
      login! user
      render json: { status: 200, logged_in: true, user: user }
    else
      render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  # ログアウト処理
  # ログインしていれば動作可能
  def logout
    # セッションを破棄
    reset_session

    # remember_digestを破棄
    @current_user.forget

    # cookiesを破棄
    cookies.delete(:user_id)
    cookies.delete(:remember_token)

    # @current...を破棄
    @current_user = nil
    @current_team = nil

    render json: { status: 200, logged_out: true }
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

end
