import React from "react"
import {laundryImage} from "../../lib/common";
// 洗濯ボタンを画像でする場合
// import washing from "../../images/laundries/washing.svg"
// import right from "../../images/laundries/right.svg"

// 洗濯するボタン
import {createLaundryHistories} from "../../lib/api/laundry_histories";
import {washed, unWashed} from "../../lib/api/laundries";

const howManyDays = (limit) => {
    if (limit <= 0) {
        return "今日"
    } else if (limit === 1) {
        return "明日"
    } else {
        return `あと${limit}日`
    }
}

const TodaysLaundry = ({id, name, image, isDisplayed, limitDays, update}) => {

    // 洗濯するボタン
    const handleWash = async (e, laundryId) => {
        e.preventDefault()

        // 洗濯履歴を作る
        try {
            const res = await createLaundryHistories(laundryId)
            console.log(res)
        } catch (err) {
            console.error(err)
        }

        // 洗濯物のwashAtを更新、今日は非表示にする
        try {
            const res = await washed(laundryId)
            console.log(res)
        } catch (err) {
            console.error(err)
        }

        update()
    }

    const handleUnWash = async (e, laundryId) => {
        // 洗濯日が今日だったらwash_atを明日にする
        // 今日は非表示にする
        try {
            const res = await unWashed(laundryId)
            console.log(res)
        } catch (err) {
            console.error(err)
        }

        update()
    }

    if (isDisplayed) {
        return (
            <div className="grid grid-cols-9 bg-pink-200 max-h-16 h-16 w-full">
                <img src={laundryImage(image)} alt={`${name}の画像`} className="w-4/5 col-span-1 m-auto"/>
                <p className="col-span-3 my-auto leading-none">{name}</p>
                <p className="col-span-1 my-auto leading-tight text-sm">{howManyDays(limitDays)}</p>
                <div className="col-span-2 my-auto">
                    <button className="py-3 px-1 rounded-lg bg-gray-100 py-2 text-sm"
                            onClick={(e) => {
                                handleWash(e, id)
                            }}>洗濯する
                    </button>
                </div>
                <div className="col-span-2 my-auto">
                    <button className="border-2 rounded-lg px-1 py-2 bg-gray-200 col-span-2 leading-none text-sm"
                            onClick={(e) => {
                                handleUnWash(e, id)
                            }}>今日は<br/>しない
                    </button>
                </div>
                {/*  TODO:洗濯する/しないボタンを画像にする場合は下記、しないなら消す  */}
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
        )
    } else {
        return (
            <div className="grid grid-cols-9 bg-gray-300 max-h-16 h-16">
                <img src={laundryImage(image)} alt={`${name}の画像`} className="w-4/5 col-span-1 m-auto"/>
                <p className="col-span-3 my-auto leading-none">{name}</p>
                <p className="col-span-1 my-auto leading-none text-sm">{howManyDays(limitDays)}</p>
                <div className="col-span-4 my-auto">
                    <button className="border-2 px-5 py-1 rounded-lg bg-gray-200 col-span-4 leading-none text-sm"
                            onClick={(e) => {
                                handleWash(e, id)
                            }}>
                        やっぱり<br/>洗濯する
                    </button>
                </div>
            </div>
        )
    }
}

export default TodaysLaundry