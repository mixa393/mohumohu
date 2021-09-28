import React, {useState, useEffect} from "react";
import {getWeatherFormat} from "../../lib/api/weather";

const backgroundImage = (telop) => {
    if (telop?.indexOf("雨") > 0) {
        return "background--rainy"
    } else if (telop?.indexOf("曇り") > 0) {
        return "background--cloud"
    } else if (telop?.indexOf("晴れ") > 0) {
        return "background--sunny"
    } else {
        return "background--cloud"
    }
};

const Weather = ({date,todaysWeather,tomorrowsWeather}) => {
    const [isToday, setIsToday] = useState(true)

    const displayedDay = ()=>{
        if (isToday) {
            return date
        } else {
            return "明日"
        }
    }

    const weather = () => {
        if (isToday) {
            return todaysWeather
        } else {
            return tomorrowsWeather
        }
    }




    // let buttons
    // if (isToday) {
    //     buttons =
    //         <div className="flex">
    //             <p className="px-3 py-1 bg-pink-100 rounded-xl">今日</p>
    //             <button className="px-3 py-1 bg-white rounded-xl hover:bg-pink-100" onClick={() => setIsToday(false)}>
    //                 明日
    //             </button>
    //         </div>
    // } else {
    //     buttons =
    //         <div className="flex">
    //             <button className="px-3 py-1 bg-white rounded-xl hover:bg-pink-100" onClick={() => setIsToday(true)}>
    //                 今日
    //             </button>
    //             <p className="px-3 py-1 rounded-xl bg-pink-100">
    //                 明日
    //             </p>
    //         </div>
    // }

    return (
        <>
            <div className={`h-72 flex flex-col justify-around items-center ${backgroundImage(weather().telop)}`}>
                {/*{buttons}*/}
                <button className="px-3 py-1 bg-white rounded-xl hover:bg-pink-100"
                        onClick={() => setIsToday(!isToday)}>
                    {displayedDay()}
                </button>
                <img src={weather().imageUrl ?? ''} alt={weather().telop ?? ''}
                     className="w-56 weather__image rounded-full"/>
                <div className="flex text-yellow-400 text-2xl">
                    <p className="mx-3 bg-gradient-to-tr from-white to-transparent rounded-xl p-3 font-bold">
                        <span className="text-xs align-top">AM</span>
                        {weather().chanceOfRainAM ?? ''}
                    </p>
                    <p className="mx-3 bg-gradient-to-tr from-white to-transparent rounded-xl p-3 font-bold">
                        <span className="text-xs align-top">PM</span>
                        {weather().chanceOfRainPM ?? ''}
                    </p>
                </div>
            </div>
        </>
    );
}


export default Weather