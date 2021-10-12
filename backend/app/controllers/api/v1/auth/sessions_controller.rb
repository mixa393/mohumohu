class Api::V1::Auth::SessionsController < ApplicationController

  def index
    if current_api_v1_user

      # インスタンスをハッシュに変換
      data = current_api_v1_user.attributes

      # remind_atがあるなら形式を変換して返却
      unless data["remind_at"].nil?
        data["remind_at"] = data["remind_at"].strftime("%H:%M")
      end

      render json: { is_login: true, data: data }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end

end
