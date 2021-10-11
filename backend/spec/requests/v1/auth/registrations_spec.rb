require 'rails_helper'

RSpec.describe "ユーザー認証API", type: :request do

  describe "POST /api/v1/auth サインアップ" do
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

  describe 'POST api/v1/auth/sign_in サインイン' do
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

  context "サインイン後" do
    let!(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }
    let(:json){JSON.parse(response.body)}

    it 'DELETE api/v1/auth/sign_out サインアウト' do
      delete "/api/v1/auth/sign_out", headers: auth_tokens
      expect(response.status).to eq(200)
      expect(json["success"]).to eq(true)
    end

    it 'PUT api/v1/auth/password パスワードの変更' do
      password = Faker::Internet.password
      update_params = { "password" => password, "password_confirmation" => password }
      put "/api/v1/auth/password", headers: auth_tokens, params: update_params
      expect(response.status).to eq(200)
      expect(json["message"]).to include("更新に成功")
    end


    it 'PUT /api/v1/auth ユーザー情報の変更' do
      update_params = { "name" => Faker::Internet.username, "email" => Faker::Internet.unique.email }
      put "/api/v1/auth", headers: auth_tokens, params: update_params
      expect(response.status).to eq(200)
      expect(json["data"]["name"]).to eq(update_params["name"])
      expect(json["data"]["email"]).to eq(update_params["email"])
    end

    it 'DELETE api/v1/auth ユーザー情報の論理削除' do
      delete "/api/v1/auth", headers: auth_tokens
      # expect(response.status).to eq(200)
      expect(User.find(user.id).deleted_at).not_to eq(nil)
      expect(User.find(user.id).email).to include("deleted")
    end
  end

end

