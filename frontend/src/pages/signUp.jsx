import React, {useState, useContext} from "react"
import {Redirect, useHistory} from "react-router-dom"
import Cookies from "js-cookie"

import {AuthContext} from "../App"
import {signUp} from "../lib/api/auth"
import {createTeam} from "../lib/api/teams";
import {createUser} from "../lib/api/users";
import locationId from "../lib/api/locationId.json"

const SignUp = () => {
    const {setIsSignedIn, setCurrentUser} = useContext(AuthContext)

    const [teamInfo, setTeamInfo] = useState({
        name: "",
        locationId: ""
    })

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        remindAt: null
    })

    const [location, setLocation] = useState({
        local: "",
        pref: ""
    })

    // const handleSubmit = async (e) => {
    // e.preventDefault()
    //
    // const params = {
    //     name,
    //     email,
    //     password,
    //     passwordConfirmation,
    //     remindAt,
    //     teamId
    // }

    //     try {
    //         const res = await signUp(params)
    //         console.log(res)
    //
    //         if (res.status === 200) {
    //             // アカウント作成と同時にログインさせてしまう
    //             Cookies.set("_access_token", res.headers["access-token"])
    //             Cookies.set("_client", res.headers["client"])
    //             Cookies.set("_uid", res.headers["uid"])
    //
    //             setIsSignedIn(true)
    //             setCurrentUser(res.data.data)
    //
    //             console.log("Signed in successfully!")
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const handleCreateUser = async (e) => {
        e.preventDefault()

        // TODO: チームの作成処理
        try {
            const resTeam = await createTeam(teamInfo)
            const teamId = resTeam.data.id

            const userData = {
                ...userInfo,
                teamId
            }

            const res = await createUser(userData)
            console.log(res)

            if (res.status === 200) {
                setCurrentUser(res.data.user)
                return <Redirect to="/"/>
            } else {
                console.log(res.data.message)
            }

        } catch (err) {
            console.log(err)
        }

        setUserInfo("")
    }

    return (
        <>
            <form onSubmit={handleCreateUser}>
                <input
                    type="hidden"
                    value={`${userInfo.name}のチーム`}
                    onChange={(e) => {
                        setTeamInfo({name: e.target.value})
                    }}
                />

                <label htmlFor={"name"}>名前</label>
                <input
                    id={"name"}
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => {
                        setUserInfo(e.target.value)
                    }}
                />

                <label htmlFor={"email"}>メールアドレス</label>
                <input
                    type="text"
                    value={userInfo.email}
                    onChange={(e) => {
                        setUserInfo(e.target.value)
                    }}
                />

                <label htmlFor={"password"}>パスワード</label>
                <input
                    type="text"
                    value={userInfo.password}
                    onChange={(e) => {
                        setUserInfo(e.target.value)
                    }}
                />

                <label htmlFor={"passwordConfirmation"}>パスワードの確認</label>
                <input
                    type="text"
                    value={userInfo.passwordConfirmation}
                    onChange={(e) => {
                        setUserInfo(e.target.value)
                    }}
                />

                <label htmlFor={"remindAt"}>リマインダー</label>
                <input
                    type="text"
                    value={userInfo.remindAt}
                    onChange={(e) => {
                        setUserInfo(e.target.value)
                    }}
                />

                <label htmlFor={"locationId"}>お住まいの地域</label>
                <select onChange={(e) => {
                    setLocation({local: e.target.value})
                }}>
                    {
                        locationId.keys().map(local => <option value={local}>{local}</option>)
                    }
                </select>
                {location.local && (
                    <select onChange={setLocation({pref: e.target.value})}>
                        {
                            (location.local?.length > 0) && (locationId[location.local].map(pref => <option
                                value={pref}>{pref}</option>))
                        }
                    </select>
                )
                }
                {location.pref && (
                    <select
                        onChange={setTeamInfo({locationId: locationId[location.local][location.pref][e.target.value]})}>
                        {
                            (location.pref?.length > 0) && (locationId[location.pref].map(city => <option
                                value={locationId[location.local][location.pref][city]}>{city}</option>))
                        }
                    </select>
                )
                }

                <input type="submit" value="Add"/>
            </form>
        </>
    )
}

export default SignUp