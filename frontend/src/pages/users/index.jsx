import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Weather from "../../components/users/weather";
import TodaysLaundries from "../../components/users/todaysLaundries";
import Loading from "../../components/common/loading"

import dayjs from "dayjs";
import "../../css/user.css";
import {getWeatherFormat} from "../../lib/api/weather";
import {getLaundryList} from "../../lib/api/laundries";

const UsersIndex = () => {

    const [loading, setLoading] = useState(false)
    const [date] = useState(dayjs().format('MM/DD ddd'))
    const history = useHistory()

    // ----------------------------- laundries取得 -------------------------------
    const [laundries, setLaundries] = useState([]);

    const getLaundries = async () => {
        try {
            const res = await getLaundryList()
            console.log(res)
            setLaundries(res.data.data)
        } catch (err) {
            console.error(err)
            // FIXME:初回は失敗するので、リロードするが後ほど解消する
            history.go(0)
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
        let abortController = new AbortController()

        setLoading(true)
        const getFromApi = async () => {
            await getLaundries()
            const res = await getWeatherFormat()

            if (res) {
                setTodaysWeather(res.today)
                setTomorrowsWeather(res.tomorrow)
            }
            setLoading(false)
        }

        getFromApi().then()

        return () => {
            abortController.abort()
        }
    }, [])

    return (
        <Loading isLoading={loading}>
            <Weather date={date} todaysWeather={todaysWeather} tomorrowsWeather={tomorrowsWeather}/>
            <TodaysLaundries laundries={laundries} update={update}/>
            {/*<Form/>*/}
        </Loading>
    )
}


export default UsersIndex