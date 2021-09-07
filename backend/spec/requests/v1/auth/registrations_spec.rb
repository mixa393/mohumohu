require 'rails_helper'

RSpec.describe "API::V1::Registrations", type: :request do
  let(:header) { { "X-Requested-With" => "XMLHttpRequest" } }

  context "POST /api/v1/auth サインアップ" do
    team = FactoryBot.create(:team)
    header = { "X-Requested-With" => "XMLHttpRequest" }
    password = Faker::Internet.password
    params = { name: Faker::Internet.username,
               email: Faker::Internet.unique.email,
               password: password,
               password_confirmation: password,
               team_id: team.id
    }

    it '200 ok' do
      post "/api/v1/auth", headers: header, params: params
      expect(response.status).to eq(200)
    end

    it '特定データの作成' do
      post "/api/v1/auth", headers: header, params: params
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(params[:name])
    end
  end

  context 'POST api/v1/auth/sign_in サインイン' do
    header = { "X-Requested-With" => "XMLHttpRequest" }
    user = FactoryBot.create(:user)
    params = { email: user.email, password: user.password }

    it '200 ok' do
      post "/api/v1/auth/sign_in", headers: header, params: params
      expect(response.status).to eq(200)
    end
  end

  context "PUT api/v1/auth/password パスワードの変更" do
    let!(:team) { FactoryBot.create(:team) }
    let!(:sign_up_header) { { "X-Requested-With" => "XMLHttpRequest" } }
    let(:sign_up_params) { { name: Faker::Internet.username,
                             email: Faker::Internet.unique.email,
                             password: "password",
                             password_confirmation: "password",
                             team_id: team.id } }

    before do
      # サインアップ
      post "/api/v1/auth", headers: sign_up_header, params: sign_up_params
    end

    # サインアップの値をヘッダーに含む
    let(:password) { Faker::Internet.password }
    let(:update_headers) { { "X-Requested-With" => "XMLHttpRequest",
                             "access-token" => response.header["access-token"],
                             "uid" => response.header["uid"],
                             "client" => response.header["client"] } }
    let(:update_params) { { "password" => password, "password_confirmation" => password } }

    it '200 ok' do
      # パスワード変更のリクエスト
      put "/api/v1/auth/password", headers: update_headers, params: update_params
      expect(response.status).to eq(200)
    end

    it '更新に成功' do
      put "/api/v1/auth/password", headers: update_headers, params: update_params
      json = JSON.parse(response.body)
      expect(json["message"]).to include("更新に成功")
    end
  end

  context "PUT api/v1/auth ユーザー情報の変更" do
    let(:password) { Faker::Internet.password }
    let!(:team) { FactoryBot.create(:team) }
    let!(:sign_up_header) { { "X-Requested-With" => "XMLHttpRequest" } }
    let(:sign_up_params) { { name: Faker::Internet.username,
                             email: Faker::Internet.unique.email,
                             password: password,
                             password_confirmation: password,
                             team_id: team.id } }
    before do
      # サインアップ
      post "/api/v1/auth", headers: sign_up_header, params: sign_up_params
    end

    let(:update_headers) { { "X-Requested-With" => "XMLHttpRequest",
                             "access-token" => response.header["access-token"],
                             "uid" => response.header["uid"],
                             "client" => response.header["client"] } }
    let(:update_params) { { "name" => Faker::Internet.username, "email" => Faker::Internet.unique.email } }

    it '200 ok' do
      put "/api/v1/auth", headers: update_headers, params: update_params
      expect(response.status).to eq(200)
    end

    it '特定データに変更' do
      put "/api/v1/auth", headers: update_headers, params: update_params
      json = JSON.parse(response.body)
      expect(json["data"]["name"]).to eq(update_params["name"])
      expect(json["data"]["email"]).to eq(update_params["email"])
    end
  end
end

