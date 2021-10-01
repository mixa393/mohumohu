import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../App";
import {changePassword, updateUser} from "../../lib/api/auth";

const UsersInfo = () => {
    const {currentUser} = useContext(AuthContext)
    const history = useHistory()

    const [isDisplayedForm, setIsDisplayedForm] = useState(false)

    const [params, setParams] = useState({
        email: "",
        name: "",
        remindAt: ""
    })

    const [passwords, setPasswords] = useState({
        password: "",
        passwordConfirmation: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userParams = params.filter(v => v)

        try {
            if (userParams) {
                const res = await updateUser(params)
                console.log(res)

                if (res.status === 200) {
                    console.log("データが変更されました")
                    console.log("res.data.data")
                }
            }

            if (passwords) {
                const res = await changePassword(passwords)
                console.log(res)

                if (res.status === 200) {
                    console.log("パスワードが変更されました")
                }
            }
        } catch (err) {
            console.error(err)
        }


        if (passwords) {
            try {
                const res = await changePassword(passwords)
                console.log(res)

                if (res.status === 200) {
                    console.log("パスワードが変更されました")
                }
            } catch (err) {
                console.error(err)
            }
        }

        history.push("/settings/user")
    }

    const contents = (isDisplayedForm) => {
        if (isDisplayedForm) {
            return (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">ユーザー名</label>
                    <input type="text" id="name" name="name"
                           className="bg-white focus:outline-none focus:ring"
                           value={params.name}
                           onChange={(e) => {
                               setParams({...params, name: e.target.value})
                           }}/>

                    <label htmlFor="email">メールアドレス</label>
                    <input type="email" id="email" name="email"
                           className="bg-white focus:outline-none focus:ring"
                           value={params.email}
                           onChange={(e) => {
                               setParams({...params, email: e.target.value})
                           }}/>

                    <label htmlFor="password">パスワード</label>
                    <input type="password" id="email" name="email"
                           className="bg-white focus:outline-none focus:ring"
                           value={passwords.password}
                           onChange={(e) => {
                               setPasswords({...passwords, password: e.target.value})
                           }}/>

                    <label htmlFor="passwordConfirmation">パスワードの確認</label>
                    <input type="passwordConfirmation" id="email" name="email"
                           className="bg-white focus:outline-none focus:ring"
                           value={passwords.passwordConfirmation}
                           onChange={(e) => {
                               setPasswords({...passwords, passwordConfirmation: e.target.value})
                           }}/>


                    <input type="submit"
                           onClick={handleSubmit}
                           value="変更"
                           className="bg-pink-300 mt-4"/>
                </form>
            )
        } else {
            return (
                <>
                    <p>{currentUser.name}</p>
                    <p>{currentUser.email}</p>
                    <p>{currentUser.remindAt}</p>
                    <button onClick={() => {setIsDisplayedForm(true)}}>変更する</button>
                    <p>退会する</p>
                </>
            )
        }
    }

    return (
        <>
            <h1>ユーザー情報</h1>
            {contents(isDisplayedForm)}
        </>
    )
}

export default UsersInfo