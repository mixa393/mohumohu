require 'rails_helper'

RSpec.describe "Laundries", type: :request do
  let(:laundry) { FactoryBot.create(:laundry) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let!(:valid_params) { { name: laundry.name,
                          wash_at: laundry.wash_at,
                          user_id: laundry.user_id,
                          team_id: laundry.team_id } }

  # laundries#create
  it "POST /api/v1/laundries" do
    expect { post '/api/v1/laundries', headers: request_header, params: valid_params }.to change(Laundry, :count).by(+1)
    expect(response.status).to eq(200)
  end

  # laundries#show
  it "GET /api/v1/laundries/:id" do
    get "/api/v1/laundries/#{laundry.id}", headers: request_header
    json = JSON.parse(response.body)

    expect(json['data']['name']).to eq(laundry.name)
    expect(response.status).to eq(200)
  end

  # laundries#update
  it "PUT /api/v1/laundries/:id" do
    put "/api/v1/laundries/#{laundry.id}", headers: request_header, params: valid_params

    json = JSON.parse(response.body)
    expect(json['data']['name']).to eq(valid_params[:name])

    expect(response.status).to eq(200)
  end

  # laundries#remove
  it "DELETE /api/v1/laundries/:id" do
    delete "/api/v1/laundries/#{laundry.id}", headers: request_header
    json = JSON.parse(response.body)
    expect(json['data']['deleted_at']).not_to eq(nil)
    expect(response.status).to eq(200)
  end

end
