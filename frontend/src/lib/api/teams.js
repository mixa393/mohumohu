import client,{headers} from "./client"

/**
 * チーム情報作成
 * @param params {{name:string, locationId: string}}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createTeam = (params) => {
    return client.post("/teams" ,params)
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
export const updateTeam = (id,params) => {
    return client.put(`/teams/${id}`, params,{headers})
}

/**
 * チーム削除
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeam = (id) => {
    return client.delete(`/teams/${id}`, {headers})
}