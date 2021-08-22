import React, {useState,useEffect} from "react";
import {getWeatherFormat} from "../../lib/api/weather";

const Weather = ({locationId}) => {
    const [weather, setWeather] = useState(
        {
            telop: "",
            image_url: "",
            chanceOfRainAM: "",
            chanceOfRainPM: ""
        }
    )
    useEffect(async () => {
        setWeather(await getWeatherFormat(locationId))
    })

    console.log(weather);
    return (
        <>
            <div className="bg-pink-100">
                <p>{weather.telop}</p>
                <img src={weather.image_url}/>
                <p><span className="text-xs">AM</span>{weather.chanceOfRainAM}</p>
                <p><span className="text-xs">PM</span>{weather.chanceOfRainAM}</p>
            </div>
        </>
    );
}


export default Weather