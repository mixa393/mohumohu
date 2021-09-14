import client from "./client"
import Cookies from "js-cookie"

const headers = {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    "X-Requested-With": "XMLHttpRequest"
}

/**
 * 認証済みのユーザーを取得
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getCurrentUser = () => {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid"))
        return client.get("/auth/sessions", {headers})
}

/**
 * サインアップ
 * @param params {{name:string, email:string, password:string, password_confirmation:string, remind_at:date, team_id:BigInt}}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const signUp = (params) => {
    return client.post(`/auth`, params, {headers: {"X-Requested-With": "XMLHttpRequest"}})
}

/**
 * サインイン
 * @param params {{email:string, password:string}}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const signIn = (params) => {
    return client.post(`/auth/sign_in`, params, {headers: {"X-Requested-With": "XMLHttpRequest"}})
}

/**
 * ログインした上でのパスワード変更
 * @param params {{ password:string, password_confirmation:string }}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const changePassword = (params) => {
    return client.put(`/auth/password`, params, {headers})
}

/**
 * ユーザー情報の変更
 * @param params {{ name?: string, email?:string, team_id?:BigInt, remind_at?:string}}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateUser = (params) => {
    return client.put(`/auth`, params, {headers}
    )
}

/**
 * ユーザーの削除
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteUser = () => {
    return client.delete(`/auth`, {headers})
}

/**
 * サインアウト（ログアウト）
 * @returns {Promise<AxiosResponse<any>>}
 */
export const signOut = () => {
    return client.delete("auth/sign_out", {headers})
}

