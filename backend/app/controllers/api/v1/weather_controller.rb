class Api::V1::WeatherController < ApplicationController
  # 本番環境では不要なもののPostmanでは以下が必要
  # require 'net/http'

  def get
    # 天気取得API https://weather.tsukumijima.net を利用して天気データを返却する
    # @param [VARCHAR(6)] location_id 地区ID
    # @return [json] status,data
    # data = {city: 都市名,
    #         telop: 天気,
    #         chance_of_rain_am: 午前の降水確率,
    #         chance_of_rain_pm: 午後の降水確率,
    #         image_url: 天気画像のURL}

    location_id = params[:location_id]

    uri = URI.parse("https://weather.tsukumijima.net/api/forecast/city/#{location_id}")

    begin
      # NET::HTTPを利用してAPIを叩く
      responce = Net::HTTP.get(uri)
      res = JSON.parse(responce)

      data = {
        city: res["location"]["city"],
        telop: res["forecasts"][0]["telop"],
        chance_of_rain_am: res["forecasts"][0]["chanceOfRain"]["T06_12"],
        chance_of_rain_pm: res["forecasts"][0]["chanceOfRain"]["T12_18"],
        image_url: res["forecasts"][0]["image"]["url"]
      }

      render json: {
        status: 200,
        data: data
      }
    rescue
      render json: {
        status: 400,
        message: "天気の取得に失敗しました"
      }
    end
  end

end
