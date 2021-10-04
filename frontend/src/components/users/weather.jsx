import React, {useState} from "react";
import left from "../../images/users/left.svg"
import right from "../../images/users/right.svg"

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

const Weather = ({date, todaysWeather, tomorrowsWeather}) => {
    const [isToday, setIsToday] = useState(true)

    const displayedDay = () => {
        if (isToday) {
            return "今日"
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

    let buttonForToday
    let buttonForTomorrow
    if (isToday) {
        buttonForToday = <div className="col-span-1"></div>
        buttonForTomorrow =
            <button className="col-span-1 h-full hover:bg-white hover:opacity-50 text-white text-5xl"
                    onClick={() => setIsToday(false)}>
                <img src={right} alt="明日の天気を表示する" className="h-1/5 mx-auto"/>
            </button>
    } else {
        buttonForToday =
            <button className="col-span-1 h-full hover:bg-white hover:opacity-50 text-white text-5xl"
                    onClick={() => setIsToday(true)}>
                <img src={left} alt="今日の天気を表示する" className="h-1/5 mx-auto"/>
            </button>
        buttonForTomorrow = <div className="col-span-1"></div>

    }

    return (
        <>
            <div className={`h-72 grid grid-flow-col grid-cols-6 ${backgroundImage(weather().telop)}`}>

                {buttonForToday}

                <div className="flex flex-col justify-center items-center col-span-4">
                    <p className="px-3 py-1 bg-white rounded-xl">{displayedDay()}</p>

                    <img src={weather().imageUrl ?? ''} alt={weather().telop ?? ''} className="w-56 rounded-full"/>

                    <div className="flex text-yellow-400 text-xl">
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

                {buttonForTomorrow}
            </div>
        </>
    )
        ;
}


export default Weather