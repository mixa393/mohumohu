import React,{useState} from "react";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import TodaysWheather from "../../components/users/todaysWheather";
import LaundryList from "../../components/users/laundryList";


const UsersIndex = () => {
    const [dateBegin] = useState({})

return (
    <>
        <Header/>
        <h1 className="text-green-600">{dateBegin.toLocaleString()}</h1>
        <TodaysWheather/>
        <LaundryList/>
        <Footer/>
    </>
);
}


export default UsersIndex