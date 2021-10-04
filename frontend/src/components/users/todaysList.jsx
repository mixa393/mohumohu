import React from "react";
import TodaysListItem from "./todaysListItem"

const TodaysList = ({laundries,update}) => {
    // 今日の洗濯ものがある時とない時でコンテンツを分ける
    let contents;
    if (laundries.length > 0) {
        contents = laundries.map((laundry, index) => {
            return (
                <TodaysListItem
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

export default TodaysList