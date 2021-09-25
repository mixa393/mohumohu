import React, {useState, useEffect, useContext} from "react";
import {Link, useHistory} from "react-router-dom"
import Cookies from "js-cookie"

import "../../css/menu.css"

import {AuthContext} from "../../App";
import {signOut} from "../../lib/api/auth";
import SignIn from "../../pages/signIn";

const Menu = ({menuVisibility, handleMouseDown}) => {
    const {isSignedIn, setIsSignedIn} = useContext(AuthContext)
    const history = useHistory()

    const handleSignOut = async (e) => {
        e.preventDefault()

        try {
            const res = await signOut()
            console.log(res)

            if (res.data.success) {
                Cookies.remove("_access_token")
                Cookies.remove("_client")
                Cookies.remove("_uid")

                setIsSignedIn(false)
                console.log("Succeeded in sign out")

                history.push("/signin")
            } else {
                console.log("Failed in sign out")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const [visibility, setVisibility] = useState("hide")
    const [visibleOverRay, setVisibleOverRay] = useState("hidden")

    useEffect(() => {
        setVisibility(menuVisibility ? "show" : "hide")
        setVisibleOverRay(menuVisibility ? "" : "hidden")

    }, [menuVisibility]);

    return (
        <>
            <div id="flyoutMenu"
                 onMouseDown={handleMouseDown}
                 className={`flex flex-col ${visibility}`}>
                <Link to="/" className="menu-item hover:bg-white p-3">
                    ホームページ
                </Link>

                <Link to="/setting" className="menu-item hover:bg-white p-3">
                    ユーザー情報
                </Link>

                <button className="menu-item hover:bg-white p-3"
                        onClick={(e) => {
                            handleSignOut(e)
                        }}>
                    ログアウト
                </button>
            </div>
            <button onClick={handleMouseDown}
                    className={`overlay w-screen h-screen fixed inset-0 bg-black bg-opacity-25 ${visibleOverRay}`}>

            </button>
        </>
    );
}

export default Menu