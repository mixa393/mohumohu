require 'rails_helper'

RSpec.describe "TeamsAPI", type: :request do

  let(:team) { FactoryBot.create(:team) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let(:valid_param) { { name: Faker::Team.name,
                        location_id: 280010 } }

  # teams#create
  it "POST /api/v1/teams" do
    post '/api/v1/teams', headers: request_header, params: { name: valid_param }

    # 新規データの作成
    expect { post '/api/v1/teams', headers: request_header, params: { name: valid_param } }.to change(Team, :count).by(+1)

    # status:200を返す
    expect(response.status).to eq(200)
  end

  # teams#show
  it "GET /api/v1/teams/:id" do
    get "/api/v1/teams/#{team.id}", headers: request_header

    # 特定のデータの取り出し
    json = JSON.parse(response.body)
    expect(json['data']['name']).to eq(team.name)

    # status:200を返す
    expect(response.status).to eq(200)
  end

  # teams#update
  it "PUT /api/v1/teams/:id" do
    put "/api/v1/teams/#{team.id}", headers: request_header, params: { name: valid_param }

    # データの変更
    json = JSON.parse(response.body)
    expect(json['data']['name']).to eq(valid_param)

    # status:200を返す
    expect(response.status).to eq(200)
  end

  # teams#remove
  it "DELETE /api/v1/teams/:id" do
    delete "/api/v1/teams/#{team.id}", headers: request_header

    # deleted_atカラムの値更新
    json = JSON.parse(response.body)
    expect(json['data']['deleted_at']).not_to eq(nil)

    # status:200を返す
    expect(response.status).to eq(200)
  end

end
