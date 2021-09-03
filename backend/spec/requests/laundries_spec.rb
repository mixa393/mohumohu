require 'rails_helper'

RSpec.describe "Laundries", type: :request do
  # 全てのリクエストで使用
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }

  # laundries#index
  context "GET /laundries" do
    let!(:team) { FactoryBot.create(:team) }
    let!(:laundries) { FactoryBot.create_list(:laundry, 5, team_id: team.id) }

    it "200 OK" do
      get "/api/v1/laundries", headers: request_header, params: { team_id: team.id }
      expect(response.status).to eq(200)
    end

    it '特定データの取得' do
      get "/api/v1/laundries", headers: request_header, params: { team_id: team.id }
      json = JSON.parse(response.body)
      expect(json["data"].first["name"]).to eq(laundries.first.name)
    end

    it 'weeklyの取得' do
      get "/api/v1/laundries", headers: request_header, params: { team_id: team.id }
      json = JSON.parse(response.body)
      # 5日後がFactoryBotでの初期設定のwash_at
      expect(json["data"].first["weekly"][4]).to eq(1)
      expect(json["data"].first["weekly"][5]).to eq(2)
      expect(json["data"].first["weekly"][6]).to eq(1)
      expect(json["data"].first["weekly"].length).to eq(7)
    end
  end

  # laundries#create
  context "POST /api/v1/laundries" do
    let(:user) { FactoryBot.create(:user) }
    let!(:valid_params) { { name: Faker::String.random(length: 3..12),
                            wash_at: Time.now.to_date + 5,
                            user_id: user.id,
                            team_id: user.team_id } }

    it '200 ok' do
      post '/api/v1/laundries', headers: request_header, params: valid_params
      expect(response.status).to eq(200)
    end

    it 'Laundryモデルの数が1つ増える' do
      expect { post '/api/v1/laundries', headers: request_header, params: valid_params }.to change(Laundry, :count).by(+1)
    end
  end

  # laundries#show
  context "GET /api/v1/laundries/:id" do
    let(:laundry) { FactoryBot.create(:laundry) }

    it '200 ok' do
      get "/api/v1/laundries/#{laundry.id}", headers: request_header
      expect(response.status).to eq(200)
    end

    it '特定のデータの取得' do
      get "/api/v1/laundries/#{laundry.id}", headers: request_header
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(laundry.name)
    end
  end

  # laundries#update
  context "PUT /api/v1/laundries/:id" do
    let(:user) { FactoryBot.create(:user) }
    let!(:valid_params) { { name: Faker::String.random(length: 3..12),
                            wash_at: Time.now.to_date + 5,
                            user_id: user.id,
                            team_id: user.team_id } }
    let(:laundry) { FactoryBot.create(:laundry) }

    it '200 ok' do
      put "/api/v1/laundries/#{laundry.id}", headers: request_header, params: valid_params
      expect(response.status).to eq(200)
    end

    it 'データの更新' do
      put "/api/v1/laundries/#{laundry.id}", headers: request_header, params: valid_params
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(valid_params[:name])
    end
  end

  # laundries#destroy
  context "DELETE /api/v1/laundries/:id" do
    let(:laundry) { FactoryBot.create(:laundry) }

    it '200 ok' do
      delete "/api/v1/laundries/#{laundry.id}", headers: request_header
      expect(response.status).to eq(200)
    end

    it '論理削除 deleted_atカラムの更新' do
      delete "/api/v1/laundries/#{laundry.id}", headers: request_header
      json = JSON.parse(response.body)
      expect(json['data']['deleted_at']).not_to eq(nil)
    end
  end

end

# 以下contextで分ける前のもの
#
# RSpec.describe "Laundries", type: :request do
#   # 全てのリクエストで使用
#   let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
#
#   # indexで使用
#   let!(:team) { FactoryBot.create(:team) }
#   let!(:laundries) { FactoryBot.create_list(:laundry, 5, team_id: team.id) }
#
#   # create, updateで使用
#   let(:user) { FactoryBot.create(:user) }
#   let!(:valid_params) { { name: Faker::String.random(length: 3..12),
#                           wash_at: Time.now.to_date + 5,
#                           user_id: user.id,
#                           team_id: user.team_id } }
#
#   # show, update, removeで使用
#   let(:laundry) { FactoryBot.create(:laundry) }
#
#
#   # laundries#index
#   it "GET /laundries" do
#     get "/api/v1/laundries", headers: request_header, params: { team_id: team.id }
#
#     json = JSON.parse(response.body)
#
#     expect(json["data"].first["name"]).to eq(laundries.first.name)
#     expect(json["data"].first["weekly"].length).to eq(7)
#     expect(response.status).to eq(200)
#   end
#
#   # laundries#create
#   it "POST /api/v1/laundries" do
#     expect { post '/api/v1/laundries', headers: request_header, params: valid_params }.to change(Laundry, :count).by(+1)
#     expect(response.status).to eq(200)
#   end
#
#   # laundries#show
#   it "GET /api/v1/laundries/:id" do
#     get "/api/v1/laundries/#{laundry.id}", headers: request_header
#     json = JSON.parse(response.body)
#
#     expect(json['data']['name']).to eq(laundry.name)
#     expect(response.status).to eq(200)
#   end
#
#   # laundries#update
#   it "PUT /api/v1/laundries/:id" do
#     put "/api/v1/laundries/#{laundry.id}", headers: request_header, params: valid_params
#
#     json = JSON.parse(response.body)
#     expect(json['data']['name']).to eq(valid_params[:name])
#
#     expect(response.status).to eq(200)
#   end
#
#   # laundries#remove
#   it "DELETE /api/v1/laundries/:id" do
#     delete "/api/v1/laundries/#{laundry.id}", headers: request_header
#     json = JSON.parse(response.body)
#     expect(json['data']['deleted_at']).not_to eq(nil)
#     expect(response.status).to eq(200)
#   end
#
# end
