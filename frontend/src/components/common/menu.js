import React, {useState, useEffect, useContext} from "react";
import {Link, useHistory} from "react-router-dom"
import Cookies from "js-cookie"

import "../../css/menu.css"

import {AuthContext} from "../../App";
import {signOut} from "../../lib/api/auth";

const Menu = ({menuVisibility, handleMouseDown}) => {
    const {setIsSignedIn} = useContext(AuthContext)
    const history = useHistory()

    const handleSignOut = (e) => {
        e.preventDefault();

        signOut().then((res) => {
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
        }).catch((error) => {
            console.error(error)
        })

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
                 onClick={handleMouseDown}
                 className={`flex flex-col ${visibility}`}>
                <Link to="/" className="menu-item hover:bg-white p-3">
                    ホームページ
                </Link>

                <Link to="/laundries" className="menu-item hover:bg-white p-3">
                    洗濯物一覧
                </Link>

                <Link to="/settings/team" className="menu-item hover:bg-white p-3">
                    チーム設定
                </Link>

                <Link to="/settings/user" className="menu-item hover:bg-white p-3">
                    ユーザー設定
                </Link>

                <button className="menu-item hover:bg-white p-3" onClick={handleSignOut}>
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