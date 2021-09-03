class Api::V1::SessionsController < ApplicationController

  # ログイン処理
  # 入力したpassword/password_confirmationと、DBのpassword_digestの値を比較
  # 合致した場合にtrue
  def login
    @user = User.where(deleted_at: nil).find_by(email: session_params[:email])

    if @user && @user.authenticate(session_params[:password])
      login!
      render json: { status: 200, logged_in: true, user: @user }
    else
      render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end

  # ユーザーのログイン状態を返却
  def logged_in?
    if @current_user
      render json: { status: 200, logged_in: true, user: current_user }
    else
      render json: { status: 401, logged_in: false, message: 'ユーザーが存在しません' }
    end
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

end
