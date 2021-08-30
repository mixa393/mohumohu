require 'rails_helper'

RSpec.describe "Weekly", type: :request do
  let!(:team) { FactoryBot.create(:team) }
  let!(:laundries) { FactoryBot.create_list(:laundry, 5, team_id: team.id) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }

  it "GET /weekly/:id" do
    get "/api/v1/weekly/#{team.id}", headers: request_header

    json = JSON.parse(response.body)

    expect(json["data"].first["name"]).to eq(laundries.first.name)
    expect(response.status).to eq(200)
  end
end
