import React, {useEffect, useState} from "react";
import Weather from "../../components/users/weather";
import TodaysLaundries from "../../components/users/todaysLaundries";
// import Form from "../../components/users/form";
import dayjs from "dayjs";
import "../../css/user.css";
import {getWeatherFormat} from "../../lib/api/weather";
import {getLaundryList} from "../../lib/api/laundries";

const UsersIndex = () => {
    const [date, setdate] = useState(dayjs().format('MM/DD ddd'))
    const [isLoading, setIsLoading] = useState(false)

    // ----------------------------- laundries取得 -------------------------------
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

    // ---------------------------- weather取得 ---------------------------------
    const [todaysWeather, setTodaysWeather] = useState(
        {
            telop: "",
            imageUrl: "",
            chanceOfRainAM: "",
            chanceOfRainPM: ""
        }
    )

    const [tomorrowsWeather, setTomorrowsWeather] = useState(
        {
            telop: "",
            imageUrl: "",
            chanceOfRainAM: "",
            chanceOfRainPM: ""
        }
    )

    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            getLaundries().then(),
            getWeatherFormat().then((r) => {
                console.log(r)
                setTodaysWeather(r.today)
                setTomorrowsWeather(r.tomorrow)
            })
        ]).then(()=> {
            setIsLoading(false)
        })
    }, [])

    return (
        <Loading isLoading={isLoading}>
            <Weather date={date} todaysWeather={todaysWeather} tomorrowsWeather={tomorrowsWeather}/>
            <TodaysLaundries laundries={laundries} update={update}/>
            {/*<Form/>*/}
        </>
    );
}


export default UsersIndex