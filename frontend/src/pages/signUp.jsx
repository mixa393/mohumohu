import React, {useState, useContext} from "react"
import {useHistory} from "react-router-dom"
import Cookies from "js-cookie";

import {AuthContext} from "../App"
import {signUp} from "../lib/api/auth"
import {createTeam} from "../lib/api/teams";
import locationId from "../lib/api/locationId.js"
import Button from "../components/common/button";

const SignUp = () => {
    const history = useHistory()
    const {setIsSignedIn, setCurrentUser} = useContext(AuthContext)

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
        <div className="h-screen">
            <h1 className="text-xl bg-pink-100 p-3">アカウント登録</h1>

            <form className="h-5/6 flex flex-col w-2/3 mx-auto max-w-lg justify-around mt-2">
                <div className="flex flex-col">
                    <label htmlFor={"name"}>名前</label>
                    <input
                        id="name"
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => {
                            setUserInfo({...userInfo, name: e.target.value})
                        }}
                        className="bg-gray-100 focus:outline-none focus:ring p-0.5"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor={"email"}>メールアドレス</label>
                    <input
                        type="text"
                        value={userInfo.email}
                        onChange={(e) => {
                            setUserInfo({...userInfo, email: e.target.value})
                        }}
                        className="bg-gray-100 focus:outline-none focus:ring p-0.5"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor={"password"}>パスワード</label>
                    <input type="password"
                           value={userInfo.password}
                           onChange={(e) => {
                               setUserInfo({...userInfo, password: e.target.value})
                           }}
                           className="bg-gray-100 focus:outline-none focus:ring p-0.5"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor={"passwordConfirmation"}>パスワードの確認</label>
                    <input
                        type="password"
                        value={userInfo.passwordConfirmation}
                        onChange={(e) => {
                            setUserInfo({...userInfo, passwordConfirmation: e.target.value})
                        }}
                        className="bg-gray-100 focus:outline-none focus:ring p-0.5"
                    />
                </div>

                {/*    <th><label htmlFor={"remindAt"}>リマインダー</label></th>*/}
                {/*    <td><input*/}
                {/*        type="time"*/}
                {/*        value={userInfo.remindAt}*/}
                {/*        onChange={(e) => {*/}
                {/*            setUserInfo({...userInfo, remindAt: e.target.value})*/}
                {/*        }}*/}
                {/*    /></td>*/}
                {/*</tr>*/}

                <div className="flex flex-col">
                    <label htmlFor={"locationId"}>お住まいの地域</label>

                    <select className="mt-2 bg-gray-100 p-0.5 w-full"
                            onChange={(e) => {
                                setLocation({local: e.target.value})
                            }}>
                        <option value=""/>
                        {
                            Object.keys(locationId).map(local => <option key={local}
                                                                         value={local}>{local}</option>)
                        }
                    </select>

                    <select className="mt-2 bg-gray-100 p-0.5 w-full"
                            onChange={(e) => {
                                setLocation({...location, pref: e.target.value})
                            }}>
                        <option value=""/>
                        {
                            (location.local?.length > 0) && (Object.keys(locationId[location.local])
                                .map(pref => (<option key={pref} value={pref}>{pref}</option>)))
                        }
                    </select>


                    <select className="mt-2 bg-gray-100 p--.5 w-full"
                            onChange={(e) => {
                                setLocation({...location, city: e.target.value})
                            }}>
                        <option value=""/>
                        {
                            (location.pref?.length > 0) && (Object.keys(locationId[location.local][location.pref])
                                .map(city => (<option key={city} value={city}>{city}</option>)))
                        }
                    </select>
                </div>

                <Button color="pink" func={handleCreateUser} value="登録"/>
            </form>
        </div>
    )
}

export default SignUp