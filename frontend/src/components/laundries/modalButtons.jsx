import Button from "../common/button";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import {deleteLaundry, washed} from "../../lib/api/laundries";
import {createLaundryHistories} from "../../lib/api/laundry_histories";

const ModalButtons = ({id}) => {
    const [isShownDeleteMode, setIsShownDeleteMode] = useState(false)
    const history = useHistory()

    const deleteLaundryInfo = async (e, id) => {
        e.preventDefault()

        try {
            const res = await deleteLaundry(id)
            setIsShownDeleteMode(false)
            console.log(res)
            history.push("/laundries")
        } catch (err) {
            console.error(err)
        }
    }

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
    }

    if (isShownDeleteMode) {
        return (
            <>
                <p className="text-center text-red-500">本当に削除しますか？</p>

                <div className="mt-8 w-2/3 mx-auto flex justify-between">
                    <Button color="pink" func={(e) => {
                        deleteLaundryInfo(e, id)
                    }} value="はい"/>
                    <Button color="gray" func={() => {
                        setIsShownDeleteMode(false)
                    }} value="いいえ"/>
                </div>
            </>
        )
    } else {
        return (
            <div className="mt-8 flex justify-around text-sm">
                <Button color="pink" func={(e) => {
                    handleWash(e, id)
                }} value="今日洗濯する"/>
                <Link to={`/laundries/${id}`}
                      className="bg-pink-100 hover:bg-pink-200 py-2 px-3 rounded-xl border-b-4 border-pink-500">
                    変更する
                </Link>
                <Button color="gray" func={() => {
                    setIsShownDeleteMode(true)
                }} value="削除する"/>
            </div>
        )

    }

}

export default ModalButtons