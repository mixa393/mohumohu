import React from "react"

import bear from "../../images/laundries/bear.svg"
import curtains from "../../images/laundries/curtains.svg"
import washing from "../../images/laundries/washing.svg"
import right from "../../images/laundries/right.svg"

const laundryImage = (image) => {
    switch (image) {
        case "curtains":
            return "curtains";
        case "duvet-cover":
            return "duvet";
        case "blanket":
            return "blanket";
        case "pillow":
            return "pillow";
        case "cushion":
            return "cushion";
        case "sheets":
            return "sheets";
        case "mat":
            return "mattress";
        case "bear":
            return "bear";
        case "default":
            return "default";
        default:
            return "default";
    }

};

const LaundryItem = ({id, name, image, limitDays}) => {
    //
    // const handleWashing = ()=>{
    //
    // }

    return (
        <>
            <div className="flex bg-pink-200 h-full w-full justify-around items-center">
                <img src={curtains} alt={`${name}の画像`} className="h-3/5 w-auto"/>
                <p>{name}</p>
                <p>あと{limitDays}日</p>
                <img src={washing} alt={`${name}を今日洗濯する`} className="h-3/5 w-auto"/>
                <img src={right} alt={`${name}は明日洗濯する`} className="h-3/5 w-auto"/>
            </div>
        </>
    )
}

export default LaundryItem