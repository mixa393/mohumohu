import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../App";
import {changePassword, updateUser} from "../../lib/api/auth";
import Button from "../../components/common/button";
import "../../css/setting.css"
import Tooltip from "../../components/common/tooltip";

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
                    <form onSubmit={handleSubmit} className="mt-4 w-3/4 mx-auto">
                        <div className="mt-6 w-full mx-auto">
                            <label htmlFor="name" className="text-left block">ユーザー名</label>
                            <input type="text" id="name" name="name"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   defaultValue={currentUser.name}
                                   onChange={(e) => {
                                       setParams({...params, name: e.target.value})
                                   }}/>
                        </div>

                        <div className="mt-6 w-full mx-auto">
                            <label htmlFor="email" className="text-left block">メールアドレス</label>
                            <input type="email" id="email" name="email"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   defaultValue={currentUser.email}
                                   onChange={(e) => {
                                       setParams({...params, email: e.target.value})
                                   }}/>
                        </div>

                        <div className="mt-6 w-full mx-auto">
                            <label htmlFor="password" className="text-left block">パスワード</label>
                            <input type="password" id="password" name="password"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   defaultValue={passwords.password}
                                   onChange={(e) => {
                                       setPasswords({...passwords, password: e.target.value})
                                   }}/>
                        </div>

                        <div className="mt-6 w-full mx-auto">
                            <label htmlFor="passwordConfirmation" className="text-left block">
                                パスワードの確認
                                <Tooltip content="確認のため再度入力して下さい"/>
                            </label>
                            <input type="passwordConfirmation" id="passwordConfirmation" name="passwordConfirmation"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   defaultValue={passwords.passwordConfirmation}
                                   onChange={(e) => {
                                       setPasswords({...passwords, passwordConfirmation: e.target.value})
                                   }}/>
                        </div>

                        <div className="mt-8 space-x-4">
                            <Button color="yellow" func={handleSubmit} value="変更する" option="w-2/5"/>
                            <Button color="gray" func={() => {
                                setIsDisplayedForm(false)
                            }} value="戻る" option="w-2/5"/>
                        </div>

                    </form>
                </>
            )
        } else {
            return (
                <>
                    <div className="w-3/4 mx-auto">
                        <div className="mt-8 w-full mx-auto">
                            <h2 className="text-left">ユーザー名</h2>
                            <p className="bg-gray-100 p-2">{currentUser.name}</p>
                        </div>

                        <div className="mt-8 w-full mx-auto">
                            <h2 className="text-left">メールアドレス</h2>
                            <p className="bg-gray-100 p-2">{currentUser.email}</p>
                        </div>

                        {/*<div className="w-full mx-auto">*/}
                        {/*    <h2 className="text-left">リマインダー</h2>*/}
                        {/*    <p className="bg-gray-100 p-2">{currentUser.remindAt}</p>*/}
                        {/*</div>*/}

                        <div className="mt-8 space-x-4">
                            <Button color="yellow" func={() => {
                                setIsDisplayedForm(true)
                            }} value="変更する" option="w-2/5"/>
                            <Button color="gray" func={() => {
                                setIsDisplayedForm(true)
                            }} value="退会する" option="w-2/5"/>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <h1 className="p-2 text-xl heading-image font-black">ユーザー情報</h1>
            {contents(isDisplayedForm)}
        </>
    )
}

export default UsersInfo