import client from "./client"
import Cookies from "js-cookie"

const headers = {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
}
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
            telop: data.data.telop,
            imageUrl: data.data.imageUrl,
            chanceOfRainAM: data.data.chanceOfRainAm,
            chanceOfRainPM: data.data.chanceOfRainPm
        }
    } catch (e) {
        alert("エラーが発生しました。ページをリロードして下さい。")
    }
}