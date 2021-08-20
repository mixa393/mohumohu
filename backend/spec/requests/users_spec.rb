require 'rails_helper'

RSpec.describe "UsersAPI", type: :request do

  let(:user) { FactoryBot.create(:user) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let(:valid_params) { { name: user.name,
                         email: user.email+"s",
                         password: user.password,
                         password_confirmation: user.password,
                         team_id: user.team.id } }

  # it "POST /api/v1/users" do
  #   print user.team_id
  #   print valid_params
  #
  #   post '/api/v1/users', headers: request_header, params: valid_params
  #   print response.body
  #   expect { post '/api/v1/users', headers: request_header, params: valid_params }.to change(User, :count).by(+1)
  #   expect(response.status).to eq(200)
  # end

  it "GET /api/v1/users/:id" do
    get "/api/v1/users/#{user.id}", headers: request_header

    json = JSON.parse(response.body)
    expect(json['data']['name']).to eq(user.name)

    expect(response.status).to eq(200)
  end

  # it "PUT /api/v1/users/:id" do
  #   put "/api/v1/users/#{user.id}", headers: request_header, params: { name: valid_param }
  #
  #   json = JSON.parse(response.body)
  #   expect(json['data']['name']).to eq(valid_param)
  #   expect(response.status).to eq(200)
  # end
  #
  # it "DELETE /api/v1/users/:id" do
  #   delete "/api/v1/users/#{user.id}", headers: request_header
  #
  #   json = JSON.parse(response.body)
  #   expect(json['data']['deleted_at']).not_to eq(nil)
  #   expect(response.status).to eq(200)
  # end

end
