import client from "./client"
import Cookies from "js-cookie"

const headers = {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    "X-Requested-With": "XMLHttpRequest"
}

/**
 * チーム情報作成
 * @param params {{name:string, locationId: string}}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createTeam = (params) => {
    return client.post("/teams", {headers: {"X-Requested-With": "XMLHttpRequest"}, params})
}

/**
 * チーム情報取得
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeam = (id) => {
    return client.get(`/teams/${id}`, {headers})
}

/**
 * チーム情報更新
 * @param params {name, locationId}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateTeam = (params) => {
    return client.put("/teams", {headers, params})
}

/**
 * チーム削除
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeam = (id) => {
    return client.delete(`/teams/${id}`, {headers})
}