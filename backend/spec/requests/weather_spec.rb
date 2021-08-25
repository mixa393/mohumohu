require 'rails_helper'
require 'net/http'

RSpec.describe "Weathers", type: :request do

  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let(:valid_params) { { location_id: 130010 } }

  it "GET /weather" do
    get "/api/v1/weather", headers: request_header, params: valid_params

    json = JSON.parse(response.body)

    expect(json["data"]["city"]).to eq("東京")
    expect(response.status).to eq(200)
  end
end
