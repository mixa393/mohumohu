# ユーザー登録用コントローラ
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:name, :team_id, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end