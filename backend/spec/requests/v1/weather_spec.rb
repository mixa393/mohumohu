require 'rails_helper'
require 'net/http'

RSpec.describe "Weathers", type: :request do
  # サインイン
  let(:user) { FactoryBot.create(:user) }
  let(:auth_tokens) { sign_in(user) }

  it "GET /weather" do
    get "/api/v1/weather", headers: auth_tokens

    json = JSON.parse(response.body)

    # 例として東京のデータ(location_id:130010)を取得
    expect(json["data"]["city"]).to eq("東京")
    expect(response.status).to eq(200)
  end
end

# モックやりかけて諦めた
# RSpec.describe "Weathers", type: :request do
#
#   let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }
#   let(:response_data) { { city: "東京",
#                           telop: "曇り",
#                           chance_od_rain_am: "20%",
#                           chance_of_rain_pm: "30%",
#                           image_url: "https://weather.tsukumijima.net/logo.png" }.to_json }
#   let(:valid_param) { { location_id: 130010 } }
#   let(:controller) { Api::V1::WeatherController.new }
#
#   before do
#     get_weather_mock = double('Weather API')
#     response_mock = double('response_mock', status: 200, data: response_data)
#     allow(get_weather_mock).to receive(:get).and_return(response_mock)
#     allow(controller).to receive(:get).and_return(get_weather_mock)
#   end
#
#   it "GET /weather" do
#     response = controller.get
#     get_weather_mock, headers: request_header, params: valid_param
#     json = JSON.parse(response.body)
#
#     # 例として東京のデータ(location_id:130010)を取得
#     expect(json["data"]["city"]).to eq("東京")
#     expect(response.status).to eq(200)
#   end
# end