import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom"
import sun from "../../images/common/sun.svg";
import tshirt from "../../images/common/tshirts.svg"
import menu from "../../images/common/menu.svg";
import MenuButton from "../common/menuButton"
import Menu from "../common/menu"
import "../../css/menu.css"

const Header = ({date}) => {

    //headerの幅を変える
    const [width, setWidth] = useState({
        index: "",
        laundries: "",
        setting: ""
    })

    const location = useLocation()

    useEffect(() => {
        const {pathname} = location
        if (pathname === "/") {
            setWidth({
                index: "col-span-7",
                laundries: "col-span-3",
                setting: "col-span-1"
            })
        } else if (pathname === "/laundries") {
            setWidth({
                index: "col-span-3",
                laundries: "col-span-7",
                setting: "col-span-1"
            })
        } else {
            setWidth({
                index: "col-span-5",
                laundries: "col-span-5",
                setting: "col-span-1"
            })
        }
    }, [location])

    const [visible, setVisible] = useState(false)

    const toggleMenu = (e) => {
        setVisible(!visible);

        e.stopPropagation();
    }


    return (
        <>
            <header>
                <div className="h-16 grid grid-cols-11">
                    <div className={width.index}>
                        <Link className="h-16 bg-pink-400 flex justify-items-center items-center" to={"/"}>
                            <img src={sun} alt="ダッシュボード" className="h-3/5 w-auto mx-auto"/>
                        </Link>
                    </div>
                    <div className={width.laundries}>
                        <Link className="h-16 bg-pink-300 flex justify-items-center items-center" to="/laundries">
                            <img src={tshirt} alt="洗濯物リスト" className="h-3/5 w-auto mx-auto"/>
                        </Link>
                    </div>
                    <nav className={width.setting}>
                        <MenuButton handleMouseDown={toggleMenu}/>
                        <Menu handleMouseDown={toggleMenu}
                              menuVisibility={visible}/>
                    </nav>
                </div>
            </header>

        </>
    );
}


export default Header