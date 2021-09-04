require 'rails_helper'

RSpec.describe "LaundryHistories", type: :request do
  let!(:team) { FactoryBot.create(:team) }
  let!(:users) { FactoryBot.create_list(:user, 3, team_id: team.id) }
  # let!(:laundries) { users.each { |user| FactoryBot.create_list(:laundry, rand(1..3), user_id: user.id) } }
  # let!(:laundry_histories) { laundries.each { |laundry| FactoryBot.create_list(:laundry_history, rand(1..5),
  #                                                                              user_id: users.first.id,
  #                                                                              laundry_id: laundry.id) } }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }

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
    debugger
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
