import React from "react"

import bear from "../../images/laundries/bear.svg"
import curtains from "../../images/laundries/curtains.svg"
import defaultImage from "../../images/laundries/tops01.png"
import duvet from '../../images/laundries/duvet.svg'
import mat from '../../images/laundries/mattress.svg'
import pillow from '../../images/laundries/pillow01.png'
import blanket from '../../images/laundries/blanket.png'
import cushions from '../../images/laundries/cushions.svg'
import sheets from '../../images/laundries/sheets.svg'

// 洗濯ボタンを画像でする場合
// import washing from "../../images/laundries/washing.svg"
// import right from "../../images/laundries/right.svg"

// 洗濯するボタン
import {createLaundryHistories} from "../../lib/api/laundry_histories";
import {updateLaundry, washed} from "../../lib/api/laundries";

const laundryImage = (image) => {
    switch (image) {
        case "curtains":
            return curtains;
        case "duvet-cover":
            return duvet;
        case "blanket":
            return blanket;
        case "pillow":
            return pillow;
        case "cushions":
            return cushions;
        case "sheets":
            return sheets;
        case "mat":
            return mat;
        case "bear":
            return bear;
        default:
            return defaultImage;
    }
};

const howManyDays = (limit) => {
    if (limit <= 0) {
        return "今日"
    } else if (limit === 1) {
        return "明日"
    } else {
        return `あと${limit}日`
    }
}

const LaundryItem = ({id, name, image, limitDays}) => {

    // 洗濯するボタン
    const handleWashing = async (e, laundryId) => {
        e.preventDefault()

        // TODO:laundry_history実装後動作確認
        // 洗濯履歴を作る
        // try {
        //     const res = await createLaundryHistories(laundryId)
        //     console.log(res)
        // } catch (err) {
        //     console.error(err)
        // }

        // 洗濯物のwashAtを更新
        try {
            const res = await washed(laundryId)
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }

    // const handleDontWash = async (e, laundryId, limit) => {
    //     // 洗濯日が今日だったらwash_atを明日にする
    //     if (limit <= 0) {
    //         const today = new Date();
    //         const tomorrow = today.setDate(today.getDate() + 1);
    //
    //         try {
    //             const res = await updateLaundry(laundryId, {wash_at: tomorrow})
    //             console.log(res)
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     } else {
    //         // 今日はグレー表示にする
    //     }
    // }

    return (
        <>
        <div className="flex bg-pink-200 h-full w-full justify-around items-center">
            <img src={laundryImage(image)} alt={`${name}の画像`} className="h-3/5 w-auto"/>
            <p>{name}</p>
            <p>{howManyDays(limitDays)}</p>
            <button className="border-2 p-2 rounded-lg"
                onClick={(e) => {handleWashing(e, id)}}>洗濯する</button>
        {/*<div className="flex h-4/5 items-center">*/}
        {/*    <img src={washing} alt={`${name}を今日洗濯する`} className="h-3/5 w-auto mr-2"*/}
        {/*         onClick={(e) => {*/}
        {/*             handleWashing(e, id)*/}
        {/*         }}/>*/}
        {/*<img src={right} alt={`${name}を今日は洗濯しない`} className="h-3/5 w-auto"*/}
        {/*     onClick={(e) => {*/}
        {/*         handleDontWash(e, id, limitDays)*/}
        {/*     }}/>*/}
        {/*</div>*/}
        </div>
</>
)
}

export default LaundryItem