require 'rails_helper'

RSpec.describe "LaundryHistoriesAPI", type: :request do
  let!(:team) { FactoryBot.create(:team) }
  let!(:users) { FactoryBot.create_list(:user, 3, team_id: team.id) }
  let!(:laundries) { FactoryBot.create_list(:laundry, 5, team_id: team.id) }
  let!(:laundry_histories) { [] }

  # 1人目のユーザーでサインイン
  include AuthorizationSpecHelper
  let(:auth_tokens) { sign_in(users.first) }

  before :each do
    laundries.each { |laundry|
      users.each { |user|
        laundry_histories << FactoryBot.create(:laundry_history, user_id: user.id, laundry_id: laundry.id)
      }
    }
  end

  it "GET /api/v1/laundry_histories" do
    get "/api/v1/laundry_histories", headers: auth_tokens

    # status:200 ok
    expect(response.status).to eq(200)

    # 他のユーザーが作成した履歴でも、同じチームに属する履歴は取得できている
    json = JSON.parse(response.body)
    expect(json['data'].length).to eq(laundry_histories.length)
  end

  it "GET /api/v1/laundry_histories/:id" do
    laundry_id = laundries.sample.id
    get "/api/v1/laundry_histories/#{laundry_id}", headers: auth_tokens

    expect(response.status).to eq(200)

    json = JSON.parse(response.body)

    if json["data"].first
      expect(json['data'].first["laundry_id"]).to eq(laundry_id)
    end
  end

  it "POST /api/v1/laundry_histories" do
    expect { post "/api/v1/laundry_histories", headers: auth_tokens, params: { laundry_id: laundries.sample.id } }
      .to change(LaundryHistory, :count).by(+1)

    expect(response.status).to eq(200)
  end

  it "DELETE /api/v1/laundry_histories/:id" do
    laundry_history = FactoryBot.create(:laundry_history, user_id: users.first.id, laundry_id: laundries.sample.id)
    delete "/api/v1/laundry_histories/#{laundry_history.id}", headers: auth_tokens

    json = JSON.parse(response.body)
    expect(json['data']['deleted_at']).not_to eq(nil)
    expect(response.status).to eq(200)
  end
end