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

const LaundryItem = ({id, name, image, isDisplayed, limitDays, update}) => {

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
            <>
                <div className="flex bg-pink-200 h-full w-full justify-around items-center">
                    <img src={laundryImage(image)} alt={`${name}の画像`} className="h-3/5 w-auto"/>
                    <p>{name}</p>
                    <p>{howManyDays(limitDays)}</p>
                    <button className="border-2 p-2 rounded-lg bg-gray-100"
                            onClick={(e) => {
                                handleWash(e, id)
                            }}>洗濯<br/>する
                    </button>
                    <button className="border-2 p-2 rounded-lg bg-gray-200"
                            onClick={(e) => {
                                handleUnWash(e, id)
                            }}>今日は<br/>しない
                    </button>

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
            </>
        )
    } else {
        return (
            <div className="flex bg-gray-300 h-full w-full justify-around items-center">
                <img src={laundryImage(image)} alt={`${name}の画像`} className="h-3/5 w-auto"/>
                <p>{name}</p>
                <p>{howManyDays(limitDays)}</p>
                <button className="border-2 p-2 rounded-lg bg-gray-200"
                        onClick={(e) => {handleWash(e, id)}}>
                    やっぱり今日<br/>洗濯する
                </button>

            </div>
        )
    }
}

export default LaundryItem