import React from "react";
import { Link } from "react-router-dom"
import { slide as Menu } from "react-burger-menu";
import "../../css/menu.css"

export default props => {
    return (
        <Menu {...props}>
            <Link to="/" className="menu-item" >
                ホームページ
            </Link>

            <Link to="/setting" className="menu-item" >
                ユーザー情報
            </Link>

            <Link to="/logout" className="menu-item" >
                ログアウト
            </Link>
        </Menu>
    );
};