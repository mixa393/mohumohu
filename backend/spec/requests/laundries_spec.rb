require 'rails_helper'

RSpec.describe "Laundries", type: :request do
  # 全てのリクエストで使用
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }

  # indexで使用
  let!(:team) { FactoryBot.create(:team) }
  let!(:laundries) { FactoryBot.create_list(:laundry, 5, team_id: team.id) }

  # create, updateで使用
  let(:user) { FactoryBot.create(:user) }
  let!(:valid_params) { { name: Faker::String.random(length: 3..12),
                          wash_at: Time.now.to_date + 5,
                          user_id: user.id,
                          team_id: user.team_id } }

  # show, update, removeで使用
  let(:laundry) { FactoryBot.create(:laundry) }


  # laundries#index
  it "GET /laundries" do
    get "/api/v1/laundries", headers: request_header, params: { team_id: team.id }

    json = JSON.parse(response.body)

    expect(json["data"].first["name"]).to eq(laundries.first.name)
    expect(response.status).to eq(200)
  end

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
