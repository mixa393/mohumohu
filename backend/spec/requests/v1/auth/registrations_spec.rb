require 'rails_helper'

RSpec.describe "API::V1::Registrations", type: :request do

  context "POST /api/v1/auth サインアップ" do
    let!(:team) { FactoryBot.create(:team) }
    let!(:header) { { "X-Requested-With" => "XMLHttpRequest" } }
    let(:password) { Faker::Internet.password }
    let(:params) { { name: Faker::Internet.username,
                     email: Faker::Internet.unique.email,
                     password: password,
                     password_confirmation: password,
                     team_id: team.id } }
    before do
      post "/api/v1/auth", headers: header, params: params
    end

    it '200 ok' do
      expect(response.status).to eq(200)
    end

    it '特定データの作成' do
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(params[:name])
    end
  end

  context 'POST api/v1/auth/sign_in サインイン' do
    let(:header) { { "X-Requested-With" => "XMLHttpRequest" } }
    let!(:user) { FactoryBot.create(:user) }
    let(:params) { { email: user.email, password: user.password } }

    it '200 ok' do
      post "/api/v1/auth/sign_in", headers: header, params: params
      expect(response.status).to eq(200)
    end
  end

  context "PUT api/v1/auth/password パスワードの変更" do
    include AuthorizationSpecHelper
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }
    let(:password) { Faker::Internet.password }
    let(:update_params) { { "password" => password, "password_confirmation" => password } }

    it '200 ok' do
      # パスワード変更のリクエスト
      put "/api/v1/auth/password", headers: auth_tokens, params: update_params
      expect(response.status).to eq(200)
    end

    it '更新に成功' do
      put "/api/v1/auth/password", headers: auth_tokens, params: update_params
      json = JSON.parse(response.body)
      expect(json["message"]).to include("更新に成功")
    end
  end

  context "PUT api/v1/auth ユーザー情報の変更" do
    include AuthorizationSpecHelper
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }
    let(:update_params) { { "name" => Faker::Internet.username, "email" => Faker::Internet.unique.email } }

    it '200 ok' do
      put "/api/v1/auth", headers: auth_tokens, params: update_params
      expect(response.status).to eq(200)
    end

    it '特定データに変更' do
      put "/api/v1/auth", headers: auth_tokens, params: update_params
      json = JSON.parse(response.body)
      expect(json["data"]["name"]).to eq(update_params["name"])
      expect(json["data"]["email"]).to eq(update_params["email"])
    end
  end

  context "DELETE api/v1/auth ユーザー情報の論理削除" do
    include AuthorizationSpecHelper
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    it '200 ok' do
      delete "/api/v1/auth", headers: auth_tokens
      expect(response.status).to eq(200)
    end

    it 'deleted_atの更新' do
      delete "/api/v1/auth", headers: auth_tokens
      json = JSON.parse(response.body)
      expect(json["data"]["deleted_at"]).not_to eq(nil)
    end
  end
end

