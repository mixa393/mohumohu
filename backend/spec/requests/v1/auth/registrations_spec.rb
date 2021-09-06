require 'rails_helper'

RSpec.describe "API::V1::Registrations", type: :request do
  let(:header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let!(:team) { FactoryBot.create(:team) }

  it "POST /api/v1/auth" do
    password = Faker::Internet.password
    params = { name: Faker::Internet.username,
               email: Faker::Internet.unique.email,
               password: password,
               password_confirmation: password,
               team_id: team.id
    }
    post "/api/v1/auth", headers: header, params: params
    json = JSON.parse(response.body)
    expect(json['data']['name']).to eq(params[:name])
    expect(response.status).to eq(200)
  end
end
