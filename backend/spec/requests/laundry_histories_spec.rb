require 'rails_helper'

RSpec.describe "LaundryHistories", type: :request do
  # まずはチームを作る
  let!(:team) { FactoryBot.create(:team) }

  # サインイン
  let(:user) { FactoryBot.create(:user, team_id: team.id) }
  include AuthorizationSpecHelper
  let(:auth_tokens) { sign_in(user) }

  let!(:users) { FactoryBot.create_list(:user, 3, team_id: team.id) }

  before :each do
    @laundries = []
    5.times do
      @laundries << FactoryBot.create(:laundry, team_id: team.id, user_id: users.sample.id)
    end

    @laundry_histories = []
    15.times do
      @laundry_histories << FactoryBot.create(:laundry_history, user_id: users.sample.id, laundry_id: @laundries.sample.id)
    end

  end

  it "GET /api/v1/laundry_histories" do
    get "/api/v1/laundry_histories", headers: request_header, params: { team_id: team.id }
    json = JSON.parse(response.body)
    # expect(json['data']['name']).to eq(laundry.name)
    expect(response.status).to eq(200)
  end

  it "POST /api/v1/laundry_histories" do

  end

  it "GET /api/v1/laundry_histories/:id" do

  end

  it "DELETE /api/v1/laundry_histories/:id" do

  end
end
