require 'rails_helper'

RSpec.describe "Sessions", type: :request do

  let!(:user) { FactoryBot.create(:user) }
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let(:sessions) { { session: { id: user.id, name: user.name, password: user.password } } }

  it "POST /login" do
    post "/api/v1/login", headers: request_header, params: sessions
    expect(response.status).to eq(200)
  end

  it 'DELETE /logout' do
    delete "/api/v1/logout", headers: request_header
    expect(response.status).to eq(200)
  end

  it 'GET logged_in' do
    get "/api/v1/logged_in", headers: request_header, params: sessions
    debugger
    expect(response.status).to eq(200)
  end

end
