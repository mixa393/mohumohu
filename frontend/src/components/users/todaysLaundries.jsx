import React, {useEffect, useState} from "react";
import TodaysLaundry from "./todaysLaundry"
import {getLaundryList} from "../../lib/api/laundries";
import {signIn} from "../../lib/api/auth";


const TodaysLaundries = ({laundries,update}) => {
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
        contents = <div>何もない時</div>
    }

    return (
        <>
            <div className="bg-pink-100 py-3">今日の洗濯物リスト</div>
            {contents}
        </>
    );
}

export default TodaysLaundries