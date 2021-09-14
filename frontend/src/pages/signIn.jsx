import React, {useState, useContext} from "react"
import Cookies from "js-cookie"

import {AuthContext} from "../App"
import {signIn} from "../lib/api/auth"

// サインイン用ページ
const SignIn = () => {
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
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <form>
                <label htmlFor="email">メールアドレス</label>
                <input type="email" id="email" name="email"
                       value={email}
                       onChange={event => setEmail(event.target.value)}/>

                <label htmlFor="password">パスワード</label>
                <input type="password" id="password" name="password"
                       value={password}
                       onChange={event => setEmail(event.target.value)}/>

                <input type="submit"
                       disabled={!email || !password} // 空欄があった場合はボタンを押せないように
                       onClick={handleSubmit}/>
            </form>
        </>
    )
}

export default SignIn