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

    it '新しいデータが作成される' do
      expect { post '/api/v1/teams', headers: request_header, params: { name: valid_param } }
        .to change(Team, :count).by(+1)
    end
  end

  # teams#show
  context "GET /api/v1/teams/:id" do
    it "status:200を返すこと" do
      get "/api/v1/teams/#{team.id}", headers: request_header
      expect(response.status).to eq(200)
    end

    it '特定のデータが抽出できていること' do
      get "/api/v1/teams/#{team.id}", headers: request_header
      json = JSON.parse(response.body)
      expect(json['team']['name']).to eq(team.name)
    end
  end

  it "PUT /api/v1/teams/:id" do

  end

  it "DELETE /api/v1/teams/:id" do

  end

  it "POST /api/v1/teams/:id" do

  end
end
