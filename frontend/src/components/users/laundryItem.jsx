import React from "react"
import { deleteUser } from "../../lib/api/users"

export const laundryItem = ({ user, setUsers }) => {


    return (
        <tr>
            <td>{user.title}</td>
        </tr>
    )
}