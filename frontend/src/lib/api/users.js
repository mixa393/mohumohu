import client from "./client"

// user情報取得
export const getUsers = (id) => {
    return client.get(`/users/${id}`)
}

// user作成
export const createUser = (data) => {
    return client.post("/users", data)
}

// user情報更新
export const updateUsers = (data) => {
    return client.put("/users", data)
}

// user削除
export const deleteUser = (id) => {
    return client.delete(`/users/${id}`)
}