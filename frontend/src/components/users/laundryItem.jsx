import React from "react"
import { deleteUser } from "../../lib/api/users"

export const laundryItem = ({ user, setUsers }) => {
    const handleDeleteUser = async (id) => {
        try {
            const res = await deleteUser(id)
            console.log(res)

            if (res?.status === 200) {
                setUsers((prev) => prev.filter((user) => user.id !== id))
            } else {
                console.log(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <tr>
            <td>{user.title}</td>
            <td>
                <button onClick={() => handleDeleteUser(user.id || 0)}>Delete</button>
            </td>
        </tr>
    )
}