require 'rails_helper'

RSpec.describe "ユーザー認証API", type: :request do

  context "POST /api/v1/auth サインアップ" do
    let!(:team) { FactoryBot.create(:team) }
    let!(:header) { { "X-Requested-With" => "XMLHttpRequest" } }
    let(:password) { Faker::Internet.password }
    let(:params) { { name: Faker::Internet.username,
                     email: Faker::Internet.unique.email,
                     password: password,
                     password_confirmation: password,
                     remind_at: "09:00",
                     team_id: team.id } }

    it '特定データの作成' do
      post "/api/v1/auth", headers: header, params: params
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(params[:name])
    end
  end

  context 'POST api/v1/auth/sign_in サインイン' do
    let(:header) { { "X-Requested-With" => "XMLHttpRequest" } }
    let!(:user) { FactoryBot.create(:user) }
    let(:params) { { email: user.email, password: user.password } }

    it '指定ユーザーでのサインイン' do
      post "/api/v1/auth/sign_in", headers: header, params: params
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["data"]["name"]).to eq(user.name)
    end
  end

  context "DELETE api/v1/auth/sign_out サインアウト" do
    # サインイン
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    it 'success' do
      delete "/api/v1/auth/sign_out", headers: auth_tokens
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["success"]).to eq(true)
    end
  end

  context "PUT api/v1/auth/password パスワードの変更" do
    # サインイン
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    # 変更するパスワードをリクエストボディに与える
    let(:password) { Faker::Internet.password }
    let(:update_params) { { "password" => password, "password_confirmation" => password } }

    it '更新に成功' do
      put "/api/v1/auth/password", headers: auth_tokens, params: update_params
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["message"]).to include("更新に成功")
    end
  end

  context "PUT api/v1/auth ユーザー情報の変更" do
    # サインイン
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    # 変更する情報をリクエストボディに与える
    let(:update_params) { { "name" => Faker::Internet.username, "email" => Faker::Internet.unique.email } }

    it '特定データに変更' do
      put "/api/v1/auth", headers: auth_tokens, params: update_params
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["data"]["name"]).to eq(update_params["name"])
      expect(json["data"]["email"]).to eq(update_params["email"])
    end
  end

  context "DELETE api/v1/auth ユーザー情報の論理削除" do
    # サインイン
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    it 'deleted_atの更新' do
      delete "/api/v1/auth", headers: auth_tokens
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["data"]["deleted_at"]).not_to eq(nil)
    end
  end

  context "GET api/v1/auth/session ログイン中のユーザー情報表示" do
    # サインイン
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }
    it "特定ユーザー情報の表示" do
      get "/api/v1/auth/sessions", headers: auth_tokens

      # 200 ok
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["is_login"]).to eq(true)
      expect(json["data"]["name"]).to eq(user.name)
    end
  end
end

