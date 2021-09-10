import client from "./client"

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
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
    return client.get("/auth/sessions", {headers})
}

/**
 * サインアップ
 * @param params {name, email, password, password_confirmation, remind_at, team.id}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const signUp = (params) => {
    return client.post(`/auth`, params, {headers: {"X-Requested-With": "XMLHttpRequest"}})
}

/**
 * サインイン
 * @param params {email, password}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const signIn = (params) => {
    return client.post(`/auth/sign_in`, {headers: {"X-Requested-With": "XMLHttpRequest", params}})
}

/**
 * ログインした上でのパスワード変更
 * @param params { password, password_confirmation }
 * @returns {Promise<AxiosResponse<any>>}
 */
export const changePassword = (params) => {
    return client.put(`/auth/password`, {headers, params})
}

/**
 * ユーザー情報の変更
 * @param params { name || email || team.id || remind_at }
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateUser = (params) => {
    return client.put(`/auth`, {headers,params})
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

