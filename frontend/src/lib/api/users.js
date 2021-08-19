import client from "./client"

// user一覧を取得
export const getUsers = () => {
    return client.get("/users")
}

// userを新規作成
export const createUser = (data) => {
    return client.post("/users", data)
}

// userを削除
export const deleteUser = (id) => {
    return client.delete(`/users/${id}`)
}