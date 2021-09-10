import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import "../../css/menu.css"

const Menu = ({menuVisibility, handleMouseDown}) => {
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

                <Link to="/logout" className="menu-item hover:bg-white p-3">
                    ログアウト
                </Link>
            </div>
            <button onClick={handleMouseDown} className={`overlay w-screen h-screen fixed inset-0 bg-black bg-opacity-25 ${visibleOverRay}`}>

            </button>
        </>
    );
}

export default Menu