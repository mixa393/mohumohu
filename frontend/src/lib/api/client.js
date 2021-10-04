import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import Cookies from "js-cookie";

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
    ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
    baseURL: "http://192.168.10.103:3001/api/v1",
    mode: 'cors',
    credentials: 'include',
    headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
        "X-Requested-With": "XMLHttpRequest"
    },
}), options)

export default client

const headers = {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
}

export {headers}