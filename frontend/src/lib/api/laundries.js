import client from "./client"

const headers = {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
}

/**
 * 洗濯情報取得
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLaundryIndex = () => {
    return client.get(`/laundries`,{headers})
}

/**
 * 洗濯情報取得
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLaundry = (id) => {
    return client.get(`/laundries/${id}`,{headers})
}

/**
 * 洗濯物データ作成
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createLaundry = (params) => {
    return client.post("/laundries", params,{headers})
}

/**
 * 洗濯物情報更新
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateLaundry = (params) => {
    return client.put("/laundries", params,{headers})
}

/**
 * 洗濯物削除
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteLaundry = (id) => {
    return client.delete(`/laundries/${id}`,{headers})
}