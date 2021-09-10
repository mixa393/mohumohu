import client from "./client"

/**
 * 天気情報取得
 * @param params {locationId}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getWeather = (params) => {
    return client.get(`/weather`,params)
}

export const getWeatherFormat = async (id) => {
    return await getWeather(id)
        .then(({data}) => {
            return {
                telop: data.forecasts[0].telop,
                imageTitle: data.forecasts[0].image.title,
                imageUrl: data.forecasts[0].image.url,
                chanceOfRainAM: data.forecasts[0].chanceOfRain["T06_12"],
                chanceOfRainPM: data.forecasts[0].chanceOfRain["T12_18"],
            }
        })
        .catch(err => alert("エラーが発生しました。ページをリロードして下さい。"));
}