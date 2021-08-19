import React from "react"
import { deleteuser } from "../../lib/api/users"

export const userItem = ({ user, setusers }) => {
    const handleDeleteuser = async (id) => {
        try {
            const res = await deleteuser(id)
            console.log(res)

            if (res?.status === 200) {
                setusers((prev) => prev.filter((user) => user.id !== id))
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
                <button onClick={() => handleDeleteuser(user.id || 0)}>Delete</button>
            </td>
        </tr>
    )
}