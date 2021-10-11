# ユーザー登録用コントローラ
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  wrap_parameters false

  # registraions#destroy のオーバーライド
  # 論理削除 deleted_atカラムを現在日時に更新
  # @see: https://github.com/heartcombo/devise/wiki/How-to:-Soft-delete-a-user-when-user-deletes-account
  def destroy
    user = User.find(@resource.id)
    soft_delete(user)

    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    # set_flash_message :notice, :destroyed
    yield resource if block_given?
    # respond_with_navigational(resource) { redirect_to after_sign_out_path_for(resource_name) }
  end

  private

  # 論理削除メソッド
  # メールアドレスとdeleted_atを変更
  def soft_delete(user)
    deleted_email = 'deleted_' + Time.current.strftime("%F_%H_%M_%S") + user.email
    user.assign_attributes(email: deleted_email, deleted_at: Time.current)
    # user.skip_reconfirmation!
    user.save!
  end

  def sign_up_params
    params.permit(:name, :team_id, :remind_at, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.permit(:name, :team_id, :remind_at, :email, :password, :password_confirmation)
  end
end
