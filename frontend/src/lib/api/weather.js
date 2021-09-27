import client,{headers} from "./client"

/**
 * 天気情報取得
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getWeather = () => {
    return client.get(`/weather`, {headers})
}

export const getWeatherFormat = async () => {
    try {
        const {data} = await getWeather()

        return {
            city: data.data.city,
            today: {
                telop: data.data.today.telop,
                imageUrl: data.data.today.imageUrl,
                chanceOfRainAM: data.data.today.chanceOfRainAm,
                chanceOfRainPM: data.data.today.chanceOfRainPm
            },
            tomorrow: {
                telop: data.data.tomorrow.telop,
                imageUrl: data.data.tomorrow.imageUrl,
                chanceOfRainAM: data.data.tomorrow.chanceOfRainAm,
                chanceOfRainPM: data.data.tomorrow.chanceOfRainPm
            }
        }
    } catch (e) {
        alert("エラーが発生しました。ページをリロードして下さい。")
    }
}