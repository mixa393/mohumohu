# ユーザー登録用コントローラ
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  wrap_parameters false

  # registraions#destroy のオーバーライド
  # 論理削除 deleted_atカラムを現在日時に更新
  # @return [json] status,data,message
  def destroy
    if @resource
      @resource.update(deleted_at: Time.now)
      yield @resource if block_given?

      # 以下はrender_destroy_messageにdataを加えたもの
      render json: {
        status: 'success',
        data: @resource,
        message: I18n.t('devise_token_auth.registrations.account_with_uid_destroyed', uid: @resource.uid)
      }
    else
      render_destroy_error
    end
  end

  private

  def sign_up_params
    params.permit(:name, :team_id, :remind_at, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
