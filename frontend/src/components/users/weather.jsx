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

const Weather = ({locationId}) => {
    const [weather, setWeather] = useState(
        {
            telop: "",
            imageTitle: "",
            imageUrl: "",
            chanceOfRainAM: "",
            chanceOfRainPM: ""
        }
    )
    useEffect( () => {
        getWeatherFormat(locationId).then(r => {
            setWeather(r)
        })
    },[locationId])


    return (
        <>
            <div className={`h-64 flex flex-col justify-around items-center ${backgroundImage(weather.telop)}`}>
                <img src={weather.imageUrl} alt={weather.imageTitle} className="w-56 weather__image rounded-full"/>
                <div className="flex text-yellow-400 text-2xl">
                    <p className="mx-3 bg-gradient-to-tr from-white to-transparent rounded-xl p-3 font-bold"><span className="text-xs align-top">AM</span>{weather.chanceOfRainAM}</p>
                    <p className="mx-3 bg-gradient-to-tr from-white to-transparent rounded-xl p-3 font-bold"><span className="text-xs align-top">PM</span>{weather.chanceOfRainAM}</p>
                </div>
            </div>
        </>
    );
}


export default Weather