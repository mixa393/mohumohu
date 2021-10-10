import client,{headers} from "./client"

/**
 * 洗濯物一覧
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLaundryIndex = () => {
    return client.get(`/laundries`, {headers})
}

/**
 * 1週間の洗濯物スケジュール
 * laundries#weekly用
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLaundryWeekly = () => {
    return client.get(`/laundries/weekly`, {headers})
}

/**
 * 3日以内の洗濯物情報
 * usersIndex用
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLaundryList = () => {
    return client.get(`/laundries/list`, {headers})
}

/**
 * ある1つの洗濯物情報
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLaundry = (id) => {
    return client.get(`/laundries/${id}`, {headers})
}

/**
 * 洗濯物データ作成
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createLaundry = (params) => {
    return client.post("/laundries", params, {headers})
}

/**
 * 洗濯物更新
 * @param id,params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateLaundry = (id,params) => {
    return client.put(`/laundries/${id}`, params, {headers})
}

/**
 * 洗濯物削除
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteLaundry = (id) => {
    return client.delete(`/laundries/${id}`, {headers})
}

/**
 * 洗濯した
 * @param laundry_id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const washed = (laundryId) => {
    return client.put(`/laundries/washed`, {id: laundryId}, {headers})
}

/**
 * 今日は洗濯しない
 * @param laundry_id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const unWashed = (laundryId) => {
    return client.put(`/laundries/un_washed`, {id: laundryId}, {headers})
}