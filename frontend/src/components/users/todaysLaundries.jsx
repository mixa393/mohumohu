import React, {useEffect, useState} from "react";
import TodaysLaundry from "./todaysLaundry"
import {getLaundryList} from "../../lib/api/laundries";
import {signIn} from "../../lib/api/auth";


const TodaysLaundries = () => {
    const [laundries, setLaundries] = useState([]);

    const getLaundries = async () => {
        try {
            const res = await getLaundryList()
            console.log(res)
            setLaundries(res.data.data)
        } catch (err) {
            console.error(err)
        }
    }
    const update = async () => {
        await getLaundries()
    }

    // 今日の洗濯ものがある時とない時でコンテンツを分ける
    let contents;
    if (laundries.length > 0) {
        contents = laundries.map((laundry, index) => {
            return (
                <TodaysLaundry
                    key={index}
                    index={index}
                    id={laundry.id}
                    name={laundry.name}
                    image={laundry.image}
                    isDisplayed={laundry.isDisplayed}
                    limitDays={laundry.limitDays}
                    update={update}
                />
            )
        })
    } else {
        contents = <tr>何もない時</tr>
    }

    useEffect(() => {
        getLaundries().then()
    }, []);

    return (
        <>
            <div className="bg-yellow-300">今日の洗濯物リスト</div>
            <div className="grid grid-cols-9 bg-yellow-300">
                <p className="col-span-4">アイテム</p>
                <p className="col-span-1">日数</p>
                <p className="col-span-4">/</p>
            </div>
            {contents}
        </>
    );
}

export default TodaysLaundries