import React, {useState} from "react";
import {getWeatherFormat} from "../../lib/api/weather";

const Weather = ({locationId}) => {
    const [weather, setWeather] = useState(
        getWeatherFormat(locationId)
    )

    return (
        <>
            <div className="bg-pink-100">
                <p>{weather.telop}</p>
                <img src={weather.image_url}/>
                    <p><span>AM</span>20%</p>
                    <p><span>PM</span>30%</p>
            </div>
        </>
);
}


export default Weather