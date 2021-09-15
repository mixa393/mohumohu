import React, {useState, useContext} from "react"
import {Redirect} from "react-router-dom"
import Cookies from "js-cookie";

import {AuthContext} from "../App"
import {signUp} from "../lib/api/auth"
import {createTeam} from "../lib/api/teams";
import locationId from "../lib/api/locationId.js"

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

            const res = await signUp(userData)
            console.log(res)

            if (res.status === 200) {
                // アカウント作成と同時にログインさせてしまう
                Cookies.set("_access_token", res.headers["access-token"])
                Cookies.set("_client", res.headers["client"])
                Cookies.set("_uid", res.headers["uid"])

                setIsSignedIn(true)
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
            <form onSubmit={handleCreateUser} className="flex-direction w-3/4">
                <input
                    type="hidden"
                    value={`${userInfo.name}のチーム`}
                    onChange={(e) => {
                        setTeamInfo({name: e.target.value})
                    }}
                />

                <div>
                    <label htmlFor={"name"}>名前</label>
                    <input
                        id={"name"}
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => {
                            setUserInfo(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <label htmlFor={"email"}>メールアドレス</label>
                    <input
                        type="text"
                        value={userInfo.email}
                        onChange={(e) => {
                            setUserInfo(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <label htmlFor={"password"}>パスワード</label>
                    <input
                        type="text"
                        value={userInfo.password}
                        onChange={(e) => {
                            setUserInfo(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <label htmlFor={"passwordConfirmation"}>パスワードの確認</label>
                    <input
                        type="text"
                        value={userInfo.passwordConfirmation}
                        onChange={(e) => {
                            setUserInfo(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <label htmlFor={"remindAt"}>リマインダー</label>
                    <input
                        type="time"
                        value={userInfo.remindAt}
                        onChange={(e) => {
                            setUserInfo(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <label htmlFor={"locationId"}>お住まいの地域</label>
                    <select onChange={(e) => {
                        setLocation({local: e.target.value})
                    }}>
                        {
                            Object.keys(locationId).map(local => <option value={local}>{local}</option>)
                        }
                    </select>

                    <select onChange={(e) => {
                        setLocation({pref: e.target.value})
                    }}>
                        {
                            (location.local?.length > 0) && (Object.keys(locationId[location.local])
                                .map(pref => (<option value={pref}>{pref}</option>)))
                        }
                    </select>


                    <select onChange={(e) => {
                        setTeamInfo({locationId: locationId[location.local][location.pref][e.target.value]})
                    }}>
                        {
                            (location.pref?.length > 0) && (Object.keys(locationId[location.local][location.pref])
                                .map(city => (<option value={city}>{city}</option>)))
                        }
                    </select>
                </div>

                <input type="submit" value="Add"/>
            </form>
        </>
    )
}

export default SignUp