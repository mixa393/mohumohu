import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../App";
import {changePassword, updateUser} from "../../lib/api/auth";
import Button from "../../components/common/button";

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

        for (const property in params) {
            if (params[property] === "") {
                delete params[property]
            }
        }
        console.log(params)

        try {
            if (params.name || params.email || params.remindAt) {
                const res = await updateUser(params)
                console.log(res)

                if (res.status === 200) {
                    console.log("データが変更されました")
                    console.log("res.data.data")
                }
            }

            if (passwords.password && passwords.passwordConfirmation) {
                const res = await changePassword(passwords)
                console.log(res)

                if (res.status === 200) {
                    console.log("パスワードが変更されました")
                }
            }
        } catch (err) {
            console.error(err)
        }
        setIsDisplayedForm(false)
        history.push("/settings/user")
    }

    const contents = (isDisplayedForm) => {
        if (isDisplayedForm) {
            return (
                <>
                    <form onSubmit={handleSubmit}
                          className="flex flex-col justify-around h-2/3 mt-4 w-3/4 mx-auto">
                        <div className="w-full mx-auto">
                            <label htmlFor="name" className="text-left block">ユーザー名</label>
                            <input type="text" id="name" name="name"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   value={params.name}
                                   onChange={(e) => {
                                       setParams({...params, name: e.target.value})
                                   }}/>
                        </div>

                        <div className="w-full mx-auto">
                            <label htmlFor="email" className="text-left block">メールアドレス</label>
                            <input type="email" id="email" name="email"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   value={params.email}
                                   onChange={(e) => {
                                       setParams({...params, email: e.target.value})
                                   }}/>
                        </div>

                        <div className="w-full mx-auto">
                            <label htmlFor="password" className="text-left block">パスワード</label>
                            <input type="password" id="password" name="password"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   value={passwords.password}
                                   onChange={(e) => {
                                       setPasswords({...passwords, password: e.target.value})
                                   }}/>
                        </div>

                        <div className="w-full mx-auto">
                            <label htmlFor="passwordConfirmation" className="text-left block">パスワードの確認</label>
                            <input type="passwordConfirmation" id="passwordConfirmation" name="passwordConfirmation"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   value={passwords.passwordConfirmation}
                                   onChange={(e) => {
                                       setPasswords({...passwords, passwordConfirmation: e.target.value})
                                   }}/>
                        </div>

                        <Button color="blue" func={handleSubmit} value="変更する"/>
                        <Button color="gray" func={()=>{setIsDisplayedForm(false)}} value="戻る"/>

                    </form>
                </>
            )
        } else {
            return (
                <>
                    <div className="flex flex-col justify-around h-3/5 mt-4 w-3/4 mx-auto">
                        <div className="w-full mx-auto">
                            <h2 className="text-left">ユーザー名</h2>
                            <p className="bg-gray-100 p-2">{currentUser.name}</p>
                        </div>

                        <div className="w-full mx-auto">
                            <h2 className="text-left">メールアドレス</h2>
                            <p className="bg-gray-100 p-2">{currentUser.email}</p>
                        </div>

                        {/* TODO:リマインドの変更 */}
                        {/*<div className="w-full mx-auto">*/}
                        {/*    <h2 className="text-left">リマインダー</h2>*/}
                        {/*    <p className="bg-gray-100 p-2">{currentUser.remindAt}</p>*/}
                        {/*</div>*/}

                        <Button color="blue" func={()=>{setIsDisplayedForm(true)}} value="変更する"/>
                        <Button color="gray" func={()=>{setIsDisplayedForm(true)}} value="退会する"/>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="h-screen">
                <h1 className="text-xl mt-4">ユーザー情報</h1>
                {contents(isDisplayedForm)}
            </div>
        </>
    )
}

export default UsersInfo