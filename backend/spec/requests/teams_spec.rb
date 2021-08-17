require 'rails_helper'

RSpec.describe "TeamsAPI", type: :request do

  let(:team) { FactoryBot.create(:team) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }

  it "POST /api/v1/teams" do
  end

  context "GET /api/v1/teams/:id" do
    # teams#show

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
