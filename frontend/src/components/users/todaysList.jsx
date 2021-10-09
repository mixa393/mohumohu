import React from "react";
import TodaysListItem from "./todaysListItem"
import sunGray from "../../images/common/sunGray.svg"

const TodaysList = ({laundries, update}) => {
    // 今日の洗濯ものがある時とない時でコンテンツを分ける
    let contents;
    if (laundries.length > 0) {
        contents = laundries.map((laundry, index) => {
            return (
                <>
                    <h2 className="bg-yellow-100 py-3 text-yellow-600">今日の洗濯物</h2>
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
                </>
            )
        })
    } else {
        contents = <div style={{minHeight: 'calc(100vh - 5.5rem - 18rem)'}}
                        className="bg-gray-100 h-full flex items-center justify-center space-x-2">
            <img src={sunGray} alt="" className="h-7 w-auto"/>
            <p className="text-gray-400">今日の洗濯物はありません</p>
            <img src={sunGray} alt="" className="h-7 w-auto"/>
        </div>
    }

    return (
        <>
            {contents}
        </>
    );
}

export default TodaysList