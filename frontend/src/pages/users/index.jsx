import React from "react";
import Weather from "../../components/users/weather";
import LaundryList from "../../components/users/laundryList";
// import Form from "../../components/users/form";
import dayjs from "dayjs";
import "../../css/user.css";


const UsersIndex = () => {
    const date = dayjs().format('MM/DD ddd')
    const locationId = 130010
    return (
        <>
            <Weather locationId={locationId} date={date}/>
            <LaundryList/>
            {/*<Form/>*/}
        </>
    );
}


export default UsersIndex