require 'rails_helper'
require 'net/http'

RSpec.describe "Weathers", type: :request do

  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
  let(:valid_param) { { location_id: 130010 } }

  it "GET /weather" do
    get "/api/v1/weather", headers: request_header, params: valid_param

    json = JSON.parse(response.body)

    # 例として東京のデータ(location_id:130010)を取得
    expect(json["data"]["city"]).to eq("東京")
    expect(response.status).to eq(200)
  end
end
