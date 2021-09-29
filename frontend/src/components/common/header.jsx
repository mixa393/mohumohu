import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom"
import sunWhite from "../../images/common/sun.svg";
import sunRed from "../../images/common/sun-red.png";
import tshirtWhite from "../../images/common/tshirt.png"
import tshirtColor from "../../images/common/tshirts-yellow.png"
import menuWhite from "../../images/common/menu.svg"
import menuColor from "../../images/common/menu-blue.png"
import MenuButton from "../common/menuButton"
import Menu from "../common/menu"
import "../../css/menu.css"


const Header = ({date}) => {

    // locationによって幅と色を変える
    const location = useLocation()

    const [width, setWidth] = useState({
        index: "",
        laundries: "",
        menu: ""
    })

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
            setWidth({
                index: "col-span-7",
                laundries: "col-span-3",
                menu: "col-span-1"
            })
            setBackgroundColor({
                index: "bg-pink-400",
                laundries: "bg-white",
                menu: "bg-white"
            })
            setIcon({
                index: sunWhite,
                laundries: tshirtColor,
                menu: menuColor
            })
        } else if (pathname === "/laundries") {
            setWidth({
                index: "col-span-3",
                laundries: "col-span-7",
                menu: "col-span-1"
            })
            setBackgroundColor({
                index: "bg-white",
                laundries: "bg-yellow-300",
                menu: "bg-white"
            })
            setIcon({
                index: sunRed,
                laundries: tshirtWhite,
                menu: menuColor
            })
        } else {
            setWidth({
                index: "col-span-5",
                laundries: "col-span-5",
                menu: "col-span-1"
            })
            setBackgroundColor({
                index: "bg-white",
                laundries: "bg-white",
                menu: "bg-blue-100"
            })
            setIcon({
                index: sunRed,
                laundries: tshirtColor,
                menu: menuWhite
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
                    <div className={`transition duration-150 ease-in-outduration-300 ${width.index}`}>
                        <Link
                            className={`h-16 flex justify-items-center items-center hover:bg-pink-300 ${backgroundColor.index}`}
                            to={"/"}>
                            <img src={icon.index} alt="ダッシュボード" className="h-3/5 w-auto mx-auto"/>
                        </Link>
                    </div>
                    <div className={width.laundries}>
                        <Link
                            className={`h-16 flex justify-items-center items-center hover:bg-yellow-200 ${backgroundColor.laundries}`}
                            to="/laundries">
                            <img src={icon.laundries} alt="洗濯物リスト" className="h-3/5 w-auto mx-auto"/>
                        </Link>
                    </div>
                    <nav className={width.menu}>
                        <MenuButton handleMouseDown={toggleMenu}
                                    icon={icon.menu}
                                    backgroundColor={backgroundColor.menu}/>
                        <Menu handleMouseDown={toggleMenu}
                              menuVisibility={visible}/>
                    </nav>
                </div>
            </header>

        </>
    );
}


export default Header