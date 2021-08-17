require 'rails_helper'

RSpec.describe "TeamsAPI", type: :request do

  let(:team) { FactoryBot.create(:team) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let(:valid_param) { Faker::Team.name }

  # teams#create
  context "POST /api/v1/teams" do
    it 'status:200を返す' do
      post '/api/v1/teams', headers: request_header, params: { name: valid_param }
      expect(response.status).to eq(200)
    end

    it '新しいデータの作成' do
      expect { post '/api/v1/teams', headers: request_header, params: { name: valid_param } }
        .to change(Team, :count).by(+1)
    end
  end

  # teams#show
  context "GET /api/v1/teams/:id" do
    it "status:200を返す" do
      get "/api/v1/teams/#{team.id}", headers: request_header
      expect(response.status).to eq(200)
    end

    it '特定データの抽出' do
      get "/api/v1/teams/#{team.id}", headers: request_header
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(team.name)
    end
  end

  # teams#update
  context "PUT /api/v1/teams/:id" do
    it 'status:200を返す' do
      put "/api/v1/teams/#{team.id}", headers: request_header, params: { name: "updated_name" }
      expect(response.status).to eq(200)
    end
    it 'データの変更' do
      put "/api/v1/teams/#{team.id}", headers: request_header, params: { name: "updated_name" }
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq('updated_name')
    end
  end

  # teams#destroy
  context "DELETE /api/v1/teams/:id" do
    it 'status:200を返す' do
      delete "/api/v1/teams/#{team.id}", headers: request_header
      expect(response.status).to eq(200)
    end
    it 'データの削除' do
      team = FactoryBot.create(:team)
      expect { delete "/api/v1/teams/#{team.id}", headers: request_header }
        .to change(Team, :count).by(-1)
    end
  end

  # teams#remove
  it "POST /api/v1/teams/:id" do

  end
end
