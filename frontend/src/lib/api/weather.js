import client from "./client"
import Cookies from "js-cookie"

const headers = {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    "X-Requested-With": "XMLHttpRequest"
}
/**
 * 天気情報取得
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getWeather = () => {
    return client.get(`/weather`, {headers})
}

export const getWeatherFormat = async () => {
    return await getWeather()
        .then(({data}) => {
            return {
                city: data.data.city,
                telop: data.data.telop,
                imageUrl: data.data.imageUrl,
                chanceOfRainAM: data.data.chanceOfRain["T06_12"],
                chanceOfRainPM: data.data.chanceOfRain["T12_18"],
            }
        })
        .catch(err => alert("エラーが発生しました。ページをリロードして下さい。"));
}