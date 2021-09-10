import React from "react";
import menu from "../../images/common/menu.svg";
import {Link} from "react-router-dom";

const MenuButton = ({handleMouseDown}) => {
    return (
        <Link className="h-16 bg-pink-200 flex justify-items-center items-center" to="/laundries" onMouseDown={handleMouseDown}>
            <img src={menu} alt="メニュー" className="h-1/2 w-auto mx-auto"/>
        </Link>
    );

}

export default MenuButton