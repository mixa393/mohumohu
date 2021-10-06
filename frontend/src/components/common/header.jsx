import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom"
import sunWhite from "../../images/common/sun.svg";
import sunRed from "../../images/common/sun-red.png";
import tshirtWhite from "../../images/common/tshirt.png"
import tshirtColor from "../../images/common/tshirts-yellow.png"
import setting from "../../images/common/setting.svg"
import menuColor from "../../images/common/menu-blue.png"
import MenuButton from "../common/menuButton"
import Menu from "../common/menu"
import "../../css/menu.css"


const Header = ({date}) => {
    // locationによって色とアイコンを変える
    const location = useLocation()

    const [backgroundColor, setBackgroundColor] = useState({
        index: "",
        laundries: "",
        menu: ""
    })

    const [icon, setIcon] = useState({
        index: sunWhite,
        laundries: tshirtColor,
        menu: menuColor
    })

    useEffect(() => {
        const {pathname} = location
        if (pathname === "/") {
            setBackgroundColor({
                index: "bg-yellow-300",
                laundries: "bg-white",
                menu: "bg-white"
            })
            setIcon({
                index: sunWhite,
                laundries: tshirtColor,
                menu: menuColor
            })
        } else if (pathname === "/laundries") {
            setBackgroundColor({
                index: "bg-white",
                laundries: "bg-yellow-200",
                menu: "bg-white"
            })
            setIcon({
                index: sunRed,
                laundries: tshirtWhite,
                menu: menuColor
            })
        } else {
            setBackgroundColor({
                index: "bg-white",
                laundries: "bg-white",
                menu: "bg-yellow-100"
            })
            setIcon({
                index: sunRed,
                laundries: tshirtColor,
                menu: setting
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
                <div className="h-16 grid grid-cols-3">
                    <div className="transition duration-150 ease-in-outduration-300 cols-span-1 border border-dotted">
                        <Link
                            className={`h-16 flex justify-items-center items-center hover:bg-yellow-300 ${backgroundColor.index}`}
                            to={"/"}>
                            <img src={icon.index} alt="ダッシュボード" className="h-3/5 w-auto mx-auto"/>
                        </Link>
                    </div>
                    <div className="border border-dotted cols-span-1">
                        <Link
                            className={`h-16 flex justify-items-center items-center hover:bg-yellow-200 ${backgroundColor.laundries}`}
                            to="/laundries">
                            <img src={icon.laundries} alt="洗濯物リスト" className="h-3/5 w-auto mx-auto"/>
                        </Link>
                    </div>
                    <div className="border border-dotted cols-span-1">
                        <MenuButton handleMouseDown={toggleMenu}
                                    icon={icon.menu}
                                    backgroundColor={backgroundColor.menu}/>
                        <Menu handleMouseDown={toggleMenu}
                              menuVisibility={visible}/>
                    </div>
                </div>
            </header>

        </>
    );
}


export default Header