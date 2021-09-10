require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let!(:user) { FactoryBot.create(:user) }
  let(:valid_params) { { user: { user_id: user.id, email: user.email, password: user.password } } }

  it "POST /login" do
    post "/api/v1/login", headers: request_header, params: valid_params
    expect(response.status).to eq(200)
  end

  it 'POST /logout' do
    post "/api/v1/login", headers: request_header, params: valid_params
    post "/api/v1/logout", headers: request_header
    expect(response.status).to eq(200)
  end

end
