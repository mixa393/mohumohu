import React, {useState} from "react"
import {createUser} from "../../lib/api/users"

export const Form = ({users, setUsers}) => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        remind_at: "",
        team_id: 1
    })

    const handleCreateUser = async (e) => {
        e.preventDefault()

        const data = {
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            remind_at: userInfo.remind_at,
            team_id: userInfo.team_id
        }

        try {
            const res = await createUser(data)
            console.log(res)

            if (res.status == 200) {
                setUsers([...users, res.data.user])
            } else {
                console.log(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }

        setUserInfo("")
    }

    return (
        <form onSubmit={handleCreateUser}>
            <input
                type="text"
                value={userInfo.name}
                onChange={(e) => {
                    setUserInfo(e.target.value)
                }}
            />
            <input
                type="text"
                value={userInfo.mail}
                onChange={(e) => {
                    setUserInfo(e.target.value)
                }}
            />
            <input
                type="text"
                value={userInfo.password}
                onChange={(e) => {
                    setUserInfo(e.target.value)
                }}
            />
            <input
                type="text"
                value={userInfo.remind_at}
                onChange={(e) => {
                    setUserInfo(e.target.value)
                }}
            />
            <input
                type="hidden"
                value={userInfo.team_id}
                onChange={(e) => {
                    setUserInfo(e.target.value)
                }}
            />
            <input type="submit" value="Add" disabled={!title}/>
        </form>
    )
}