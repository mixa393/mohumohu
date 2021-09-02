require 'rails_helper'

RSpec.describe "Sessions", type: :request do

  let!(:user) { FactoryBot.create(:user) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let(:valid_params) { { user: { user_id: user.id, email: user.email, password: user.password } } }

  before do
    allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return({ user_id: user.id, email: user.email, password: user.password })
  end

  it "POST /login" do
    post "/api/v1/login", headers: request_header, params: valid_params
    expect(response.status).to eq(200)
  end

  it 'POST /logout' do
    post "/api/v1/logout", headers: request_header
    expect(response.status).to eq(200)
  end

  it 'GET logged_in' do
    post "/api/v1/login", headers: request_header, params: valid_params
    get "/api/v1/logged_in", headers: request_header
    expect(response.status).to eq(200)
  end

end
