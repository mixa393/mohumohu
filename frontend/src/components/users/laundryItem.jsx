import React from "react"

import bear from "../../images/laundries/bear.svg"
import curtains from "../../images/laundries/curtains.svg"
import washing from "../../images/laundries/washing.svg"
import right from "../../images/laundries/right.svg"

// 洗濯するボタン
import {createLaundryHistories} from "../../lib/api/laundry_histories";
import {washed} from "../../lib/api/laundries";

import Cookies from "js-cookie";

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

    // 洗濯するボタン
    const handleWashing = async (e, laundryId) => {
        // e.preventDefault()

        // 洗濯履歴を作る
        try {
            const res = await createLaundryHistories(laundryId)
            console.log(res)
        } catch (err) {
            console.error(err)
        }

        // 洗濯物のwashAtを更新
        try {
            const res = await washed(laundryId)
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }

    // const handleDontWash = async (e,limit,laundryId)=>{
    //
    // }
    //

    const howManyDays = (limit) => {
        if (limit <= 0) {
            return "今日"
        } else if (limit === 1) {
            return "明日"
        } else {
            return `あと${limit}日`
        }
    }
    return (
        <>
            <div className="flex bg-pink-200 h-full w-full justify-around items-center">
                <img src={curtains} alt={`${name}の画像`} className="h-3/5 w-auto"/>
                <p>{name}</p>
                <p>{howManyDays(limitDays)}</p>
                <div className="flex h-4/5 items-center">
                    <img src={washing} alt={`${name}を今日洗濯する`} className="h-3/5 w-auto"
                         onClick={handleWashing({id})}/>
                    <img src={right} alt={`${name}を今日は洗濯しない`} className="h-3/5 w-auto"/>
                </div>
            </div>
        </>
    )
}

export default LaundryItem