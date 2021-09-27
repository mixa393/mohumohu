import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom"
import sun from "../../images/common/sun.svg";
import tshirt from "../../images/common/tshirt.png"
import MenuButton from "../common/menuButton"
import Menu from "../common/menu"
import "../../css/menu.css"


const Header = ({date}) => {

    // locationによって幅と色を変える
    const location = useLocation()

    const [width, setWidth] = useState({
        index: "",
        laundries: "",
        setting: ""
    })

    const [color, setColor] = useState({
        index: "",
        laundries: ""
    })

    useEffect(() => {
        const {pathname} = location
        if (pathname === "/") {
            setWidth({
                index: "col-span-7",
                laundries: "col-span-3",
                setting: "col-span-1"
            })
            setColor({
                index: "bg-pink-400",
                laundries: "bg-gray-400"
            })
        } else if (pathname === "/laundries") {
            setWidth({
                index: "col-span-3",
                laundries: "col-span-7",
                setting: "col-span-1"
            })
            setColor({
                index: "bg-gray-400",
                laundries: "bg-yellow-300"
            })
        } else {
            setWidth({
                index: "col-span-5",
                laundries: "col-span-5",
                setting: "col-span-1"
            })
            setColor({
                index: "bg-gray-400",
                laundries: "bg-gray-400"
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
                        <Link className={`h-16 flex justify-items-center items-center hover:bg-pink-300 ${color.index}`}
                              to={"/"}>
                            <img src={sun} alt="ダッシュボード" className="h-3/5 w-auto mx-auto"/>
                        </Link>
                    </div>
                    <div className={width.laundries}>
                        <Link
                            className={`h-16 flex justify-items-center items-center hover:bg-yellow-200 ${color.laundries}`}
                            to="/laundries">
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