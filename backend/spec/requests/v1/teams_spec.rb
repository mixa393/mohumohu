require 'rails_helper'

RSpec.describe "TeamsAPI", type: :request do
  context "サインインなし" do
    let(:team) { FactoryBot.create(:team) }
    let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
    let(:valid_params) { { name: Faker::Team.name,
                           location_id: 280010 } }

    # teams#create
    it "POST /api/v1/teams" do
      post '/api/v1/teams', headers: request_header, params: valid_params

      # 新規データの作成
      expect { post '/api/v1/teams', headers: request_header, params: valid_params }.to change(Team, :count).by(+1)

      # status:200を返す
      expect(response.status).to eq(200)
    end
  end

  context "サインイン後" do
    let(:team) { FactoryBot.create(:team) }

    # ユーザー作成とサインイン
    let!(:user) { FactoryBot.create(:user, team_id: team.id) }
    include AuthorizationSpecHelper
    let(:auth_tokens) { sign_in(user) }

    let(:valid_params) { { name: Faker::Team.name,
                           location_id: 280010 } }

    # teams#show
    it "GET /api/v1/teams/:id" do
      get "/api/v1/teams/#{team.id}", headers: auth_tokens

      # 特定のデータの取り出し
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(team.name)

      # status:200を返す
      expect(response.status).to eq(200)
    end

    # teams#update
    it "PUT /api/v1/teams/:id" do
      put "/api/v1/teams/#{team.id}", headers: auth_tokens, params: valid_params

      # データの変更
      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(valid_params[:name])

      # status:200を返す
      expect(response.status).to eq(200)
    end

    # teams#remove
    it "DELETE /api/v1/teams/:id" do
      delete "/api/v1/teams/#{team.id}", headers: auth_tokens

      # deleted_atカラムの値更新
      json = JSON.parse(response.body)
      expect(json['data']['deleted_at']).not_to eq(nil)

      # status:200を返す
      expect(response.status).to eq(200)
    end
  end

end
