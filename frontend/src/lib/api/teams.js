import client from "./client"

// 情報取得
export const getTeam = (id) => {
    return client.get(`/teams/${id}`)
}

// 作成
export const createTeam = (data) => {
    return client.post("/teams", data)
}

// user情報更新
export const updateTeam = (data) => {
    return client.put("/teams", data)
}

// user削除
export const deleteTeam = (id) => {
    return client.delete(`/teams/${id}`)
}