import client from "./client"

const headers = {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    "X-Requested-With": "XMLHttpRequest"
}

/**
 * チームに属する洗濯履歴を全て取得
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAllLaundryHistories = () => {
    return client.get('/laundry_histories',{headers})
}

/**
 * ある洗濯物についての履歴を取得
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLaundryHistories = (id) => {
    return client.get(`/laundry_histories/${id}`,{headers})
}

/**
 * 洗濯履歴作成
 * @param params {laundryId}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createLaundryHistories = (params) => {
    return client.post("/laundry_histories", {headers,params})
}

/**
 * 洗濯履歴削除
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteLaundryHistories = (id) => {
    return client.delete(`/laundry_histories/${id}`,{headers})
}