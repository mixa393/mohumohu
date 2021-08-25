import React from "react";
import menu from "../../images/common/menu.svg";
import sun from "../../images/common/sun.svg";
import setting from "../../images/common/setting.svg"

const Header = ({date}) => {
    return (
        <header className="h-16 grid grid-cols-10">
            <div className="h-16 col-span-6 bg-pink-400 flex justify-items-center items-center">
                <img src={sun} alt="ダッシュボード" className="h-3/5 w-auto mx-auto"/>
            </div>
            <div className="h-16 col-span-3 bg-pink-300 flex justify-items-center items-center">
                <img src={menu} alt="洗濯物リスト" className="h-3/5 w-auto mx-auto"/>
            </div>
            <nav className="h-16 col-span-1 bg-pink-200 flex justify-items-center items-center">
                <img src={setting} alt="ユーザー設定編集" className="h-3/5 w-auto mx-auto"/>
            </nav>
        </header>
    );
}


export default Header