class Api::V1::UsersController < ApplicationController
  before_action :login?,only: [:show,:update,:destroy]
  before_action :set_user, only: [:show, :update, :destroy]

  def show
    render json: { status: 200, data: @user }
  end

  def create
    user = User.new(user_params)

    if user.save
      login!
      render json: { status: 200, data: user }
    else
      render json: { status: 400, message: "Userの作成に失敗しました", data: user.errors }
    end
  end

  def update
    if @user.update(user_params)
      render json: { status: 200, data: @user }
    else
      render json: { status: 400, data: @user.errors }
    end
  end

  # 論理削除
  def destroy
    @user[:deleted_at] = Time.now

    if @user.update(user_params)
      render json: { status: 200, data: @user }
    else
      render json: { status: 400, message: "Userの削除に失敗しました", data: @user.errors }
    end
  end

  private

  def set_user
    @user = User.where(deleted_at: nil).find(@current_user.id)
  end

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :remind_at, :team_id, :deleted_at)
  end

end
