import React from "react";
import menu from "../../images/common/menu.svg";
import {Link} from "react-router-dom";

const MenuButton = ({handleMouseDown,icon,backgroundColor}) => {
    return (
        <Link className={`h-16 flex justify-items-center items-center hover:bg-blue-200 ${backgroundColor}`} to="/laundries" onMouseDown={handleMouseDown}>
            <img src={icon} alt="メニュー" className="h-2/5 w-auto mx-auto"/>
        </Link>
    );

}

export default MenuButton