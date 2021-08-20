import React from "react";
import setting from "../../images/common/settings.png";

const Header = ({date}) => {
    return (
        <header className="bg-pink-400 h-20">
            <div className="flex h-full justify-between items-center">
                <p className="mx-9 text-5xl text-white font-bold">{date}</p>
                <nav className="mx-9 h-2/5">
                    <img src={setting} alt="ユーザー設定編集" className="h-full max-h-full w-auto"/>
                </nav>
            </div>
        </header>
    );
}


export default Header