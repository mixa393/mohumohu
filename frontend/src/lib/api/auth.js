import client, {headers} from "./client"

/**
 * 認証済みのユーザーを取得
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getCurrentUser = () => {
    // if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) {
        return client.get("/auth/sessions", {headers})
    // }
}

/**
 * サインアップ
 * @param params {{name:string, email:string, password:string, passwordConfirmation:string, remindAt:time, teamId:BigInt}}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const signUp = (params) => {
    return client.post(`/auth`, params)
}

/**
 * サインイン
 * @param params {{email:string, password:string}}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const signIn = (params) => {
    return client.post(`/auth/sign_in`, params)
}

/**
 * ログインした上でのパスワード変更
 * @param params {{passwordConfirmation: string, password: string}}
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
    return client.delete("/auth/sign_out", {headers})
}

