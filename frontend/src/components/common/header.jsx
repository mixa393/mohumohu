import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom"
import sun from "../../images/common/sun.svg";
import tshirt from "../../images/common/tshirts.svg"
import menu from "../../images/common/menu.svg";

const Header = ({date}) => {
    return (
        <header className="h-16 grid grid-cols-10">
            <div className="h-16 col-span-6 bg-pink-400 flex justify-items-center items-center">
                <img src={sun} alt="ダッシュボード" className="h-3/5 w-auto mx-auto"/>
            </div>
            <div className={width.laundries}>
                <Link className="h-16 bg-pink-300 flex justify-items-center items-center" to="/laundries">
                    <img src={tshirt} alt="洗濯物リスト" className="h-3/5 w-auto mx-auto"/>
                </Link>
            </div>
            <nav className={width.setting}>
                <Link className="h-16 bg-pink-100 flex justify-items-center items-center" to={"/setting"}>
                    <img src={menu} alt="設定編集" className="h-2/5 w-auto mx-auto"/>
                </Link>
            </nav>
        </header>
    );
}


export default Header