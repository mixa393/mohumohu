import React, {useState, useContext} from "react"
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie"

import {AuthContext} from "../App"
import {signIn} from "../lib/api/auth"
import mofit from "../images/common/mofit.svg"

// サインイン用ページ
const SignIn = () => {
    const history = useHistory()
    const {setIsSignedIn, setCurrentUser} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const params = {
            email: email,
            password: password
        }

        try {
            const res = await signIn(params)
            console.log(res)

            if (res.status === 200) {
                // ログインに成功した場合はCookieに各値を格納
                Cookies.set("_access_token", res.headers["access-token"])
                Cookies.set("_client", res.headers["client"])
                Cookies.set("_uid", res.headers["uid"])

                setIsSignedIn(true)
                setCurrentUser(res.data.data)

                console.log("Signed in successfully!")
                history.push("/")
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="h-screen flex flex-col justify-center bg-pink-100">
                <img src={mofit} alt="mofitのロゴ" className="w-52 h-auto mx-auto"/>

                <form className="flex flex-col w-2/3 mx-auto max-w-lg h-1/4 justify-around mt-4">
                    <div className="flex flex-col">
                        <label htmlFor="email">メールアドレス</label>
                        <input type="email" id="email" name="email"
                               value={email}
                               className="bg-white focus:outline-none focus:ring"
                               onChange={event => setEmail(event.target.value)}/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">パスワード</label>
                        <input type="password" id="password" name="password"
                               value={password}
                               className="bg-white focus:outline-none focus:ring"
                               onChange={event => setPassword(event.target.value)}/>
                    </div>

                    <input type="submit"
                           disabled={!email || !password} // 空欄があった場合はボタンを押せないように
                           onClick={handleSubmit}
                           value="ログイン"
                           className="bg-pink-300 mt-4"/>
                </form>

                <ul className="text-xs mt-8 text-gray-600">
                    <li>パスワードを忘れた方はこちら</li>
                    <li>初めて利用される方はこちら</li>
                </ul>
            </div>
        </>
    )
}

export default SignIn