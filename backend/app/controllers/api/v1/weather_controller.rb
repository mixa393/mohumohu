class Api::V1::WeatherController < ApplicationController

  def get
    location_id = weather_params[:location_id]

    # 天気取得API https://weather.tsukumijima.net/
    uri = URI.parse("https://weather.tsukumijima.net/api/forecast/city/#{location_id}")

    # NET::HTTPを利用してAPIを叩く
    responce = Net::HTTP.get(uri)
    res = JSON.parse(responce)

    data = {
      city: res["location"]["city"],
      # [0]は今日のデータ
      telop: res["forecasts"][0]["telop"],
      chance_of_rain_am: res["forecasts"][0]["chanceOfRain"]["T06_12"],
      chance_of_rain_pm: res["forecasts"][0]["chanceOfRain"]["T12_18"],
      image_url: res["forecasts"][0]["image"]["url"]
    }

    if res
      render json: {
        status: 200,
        data: data
      }
    else
      render json: {
        status: 400,
        message: "天気の取得に失敗しました"
      }
    end
  end

  private

  def weather_params
    params.permit(:location_id)
  end

end
