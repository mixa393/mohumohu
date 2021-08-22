import React, {useState, useEffect} from "react";
import {getWeatherFormat} from "../../lib/api/weather";

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
    useEffect(async () => {
        setWeather(await getWeatherFormat(locationId))
    })

    return (
        <>
            <div className="bg-pink-100">
                <p>{weather.telop}</p>
                <img src={weather.imageUrl} alt={weather.imageTitle}/>
                <p><span className="text-xs">AM</span>{weather.chanceOfRainAM}</p>
                <p><span className="text-xs">PM</span>{weather.chanceOfRainAM}</p>
            </div>
        </>
    );
}


export default Weather