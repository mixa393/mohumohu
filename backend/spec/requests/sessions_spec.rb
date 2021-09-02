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

  end
  it 'GET logged_in' do

  end

end
