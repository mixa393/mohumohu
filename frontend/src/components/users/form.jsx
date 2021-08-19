import React, { useState } from "react"
import { createuser } from "../../lib/api/users"

export const userForm = ({ users, setusers }) => {
    const [title, setTitle] = useState<string>("")

    const handleCreateuser = async (e) => {
        e.preventDefault()

        const data = {
            title: title
        }

        try {
            const res = await createuser(data)
            console.log(res)

            if (res.status == 200) {
                setusers([...users, res.data.user])
            } else {
                console.log(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }

        setTitle("")
    }

    return (
        <form onSubmit={handleCreateuser}>
            <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />
            <input type="submit" value="Add" disabled={!title} />
        </form>
    )
}