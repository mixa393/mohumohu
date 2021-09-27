import React, {useState} from "react";
import Weather from "../../components/users/weather";
import TodaysLaundries from "../../components/users/todaysLaundries";
// import Form from "../../components/users/form";
import dayjs from "dayjs";
import "../../css/user.css";


const UsersIndex = () => {
    const [date, setdate] = useState(dayjs().format('MM/DD ddd'))

    return (
        <>
            <Weather date={date}/>
            <TodaysLaundries/>
            {/*<Form/>*/}
        </>
    );
}


export default UsersIndex