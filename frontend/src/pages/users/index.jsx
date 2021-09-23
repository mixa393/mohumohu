import React, {useState} from "react";
import Weather from "../../components/users/weather";
import LaundryList from "../../components/users/laundryList";
// import Form from "../../components/users/form";
import dayjs from "dayjs";
import "../../css/user.css";


const UsersIndex = () => {
    const [date, setdate] = useState(dayjs().format('MM/DD ddd'))

    return (
        <>
            <Weather date={date}/>
            <LaundryList/>
            {/*<Form/>*/}
        </>
    );
}


export default UsersIndex