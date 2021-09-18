import React, {useState, useContext} from "react"
import {useHistory} from "react-router-dom"
import Cookies from "js-cookie";

import {AuthContext} from "../App"
import {getCurrentUser, signUp} from "../lib/api/auth"
import {createTeam} from "../lib/api/teams";
import locationId from "../lib/api/locationId.js"

const SignUp = () => {
    const history = useHistory()
    const {setIsSignedIn, currentUser,setCurrentUser} = useContext(AuthContext)

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        remindAt: undefined
    })

    const [location, setLocation] = useState({
        local: "",
        pref: "",
        city: ""
    })

    const handleCreateUser = async (e) => {
        e.preventDefault()

        try {
            const teamParams = {
                name: `${userInfo.name}のチーム`,
                locationId: locationId[location.local][location.pref][location.city]
            }

            const resTeam = await createTeam(teamParams)

            const teamId = resTeam.data.data.id
            const userParams = {
                ...userInfo,
                teamId
            }

            const res = await signUp(userParams)
            console.log(res)

            if (res.status === 200) {
                // アカウント作成と同時にログインさせてしまう
                Cookies.set("_access_token", res.headers["access-token"])
                Cookies.set("_client", res.headers["client"])
                Cookies.set("_uid", res.headers["uid"])

                setIsSignedIn(true)
                setCurrentUser(res.data.data)

                history.push("/")
            } else {
                console.log(res.data.message)
            }

        } catch (err) {
            console.log(err)
            console.log("catchに到達")
        } finally {
            // setUserInfo("")
        }
    }

    return (
        <>
            <form onSubmit={handleCreateUser} className="w-3/4 mx-auto">
                <table className="mx-auto table-fixed text-right">
                    <tbody>
                    <tr className="h-16">
                        <th className="w-2/5 h-full">
                            <label htmlFor={"name"}>名前</label>
                        </th>
                        <td className="w-3/5 h-full">
                            <input
                                id="name"
                                type="text"
                                value={userInfo.name}
                                onChange={(e) => {
                                    setUserInfo({...userInfo, name: e.target.value})
                                }}
                                className="h-full resize-none"
                            />
                        </td>
                    </tr>

                    <tr className="h-16">
                        <th><label htmlFor={"email"}>メールアドレス</label></th>
                        <td><input
                            type="text"
                            value={userInfo.email}
                            onChange={(e) => {
                                setUserInfo({...userInfo, email: e.target.value})
                            }}
                        />
                        </td>
                    </tr>

                    <tr className="h-16">
                        <th><label htmlFor={"password"}>パスワード</label></th>
                        <td>
                            <input
                                type="password"
                                value={userInfo.password}
                                onChange={(e) => {
                                    setUserInfo({...userInfo, password: e.target.value})
                                }}
                            />
                        </td>
                    </tr>

                    <tr className="h-16">
                        <th><label htmlFor={"passwordConfirmation"}>パスワードの確認</label></th>
                        <td>
                            <input
                                type="password"
                                value={userInfo.passwordConfirmation}
                                onChange={(e) => {
                                    setUserInfo({...userInfo, passwordConfirmation: e.target.value})
                                }}
                            />
                        </td>
                    </tr>

                    <tr className="h-16">
                        <th><label htmlFor={"remindAt"}>リマインダー</label></th>
                        <td><input
                            type="time"
                            value={userInfo.remindAt}
                            onChange={(e) => {
                                setUserInfo({...userInfo, remindAt: e.target.value})
                            }}
                        /></td>
                    </tr>

                    <tr className="h-16">
                        <th><label htmlFor={"locationId"}>お住まいの地域</label></th>
                        <td>
                            <select onChange={(e) => {
                                setLocation({local: e.target.value})
                            }}>
                                <option value=""/>
                                {
                                    Object.keys(locationId).map(local => <option key={local}
                                                                                 value={local}>{local}</option>)
                                }
                            </select>

                            <select onChange={(e) => {
                                setLocation({...location, pref: e.target.value})
                            }}>
                                <option value=""/>
                                {
                                    (location.local?.length > 0) && (Object.keys(locationId[location.local])
                                        .map(pref => (<option key={pref} value={pref}>{pref}</option>)))
                                }
                            </select>


                            <select onChange={(e) => {
                                setLocation({...location, city: e.target.value})
                                // setTeamInfo({...teamInfo,locationId: locationId[location.local][location.pref][e.target.value]})
                            }}>
                                <option value=""/>
                                {
                                    (location.pref?.length > 0) && (Object.keys(locationId[location.local][location.pref])
                                        .map(city => (<option key={city} value={city}>{city}</option>)))
                                }
                            </select>
                        </td>

                    </tr>
                    </tbody>
                </table>
                {/*<button type="submit" className="bg-pink-100">登録</button>*/}
                <input type="submit" value="登録" className="bg-pink-100"/>
            </form>
        </>
    )
}

export default SignUp