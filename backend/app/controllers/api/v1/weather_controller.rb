class Api::V1::WeatherController < ApplicationController
  before_action :authenticate_api_v1_user!

  # 本番環境では不要なもののPostmanでは以下が必要
  require 'net/http'

  # 天気取得利用して今日と明日の天気データを返却する
  # @see: 天気取得API https://weather.tsukumijima.net
  # @return [json] status,data
  # data = {city: 都市名,
  #         telop: 天気,
  #         chance_of_rain_am: 午前の降水確率,
  #         chance_of_rain_pm: 午後の降水確率,
  #         image_url: 天気画像のURL}
  def get
    # location_idの取得
    team = Team.find(current_api_v1_user.team_id)
    location_id = team.location_id

    # 天気APIへのリクエスト雛形
    uri = URI.parse("https://weather.tsukumijima.net/api/forecast/city/#{location_id}")

    begin
      # NET::HTTPを利用してAPIを叩く
      responce = Net::HTTP.get(uri)
      res = JSON.parse(responce)

      today = {
        telop: res["forecasts"][0]["telop"],
        chance_of_rain_am: res["forecasts"][0]["chanceOfRain"]["T06_12"],
        chance_of_rain_pm: res["forecasts"][0]["chanceOfRain"]["T12_18"],
        image_url: res["forecasts"][0]["image"]["url"]
      }

      tomorrow = {
        telop: res["forecasts"][1]["telop"],
        chance_of_rain_am: res["forecasts"][1]["chanceOfRain"]["T06_12"],
        chance_of_rain_pm: res["forecasts"][1]["chanceOfRain"]["T12_18"],
        image_url: res["forecasts"][1]["image"]["url"]
      }

      data = {
        city: res["location"]["city"],
        today: today,
        tomorrow: tomorrow
      }

      render json: {
        status: 200,
        data: data
      }
    rescue => e
      render json: {
        status: 400,
        message: "天気の取得に失敗しました",
        response: e
      }
    end
  end

end
