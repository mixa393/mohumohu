import React, {useState} from "react";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import Weather from "../../components/users/weather";
import LaundryList from "../../components/users/laundryList";
import dayjs from "dayjs";

const UsersIndex = () => {
    const [dateBegin] = useState({})
    const now = dayjs()
    return (
        <>
            <Header/>
            <p>{dayjs().format("MM/DD")}</p>
            <h1 className="text-green-600">h1tag</h1>
            <Weather/>
            <LaundryList/>
            <Footer/>
        </>
    );
}


export default UsersIndex