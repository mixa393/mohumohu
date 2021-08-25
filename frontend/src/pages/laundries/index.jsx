import React from "react";
import "../../css/laundries.css";
import Header from "../../components/common/header";
import List from "../../components/laundries/list";
import Footer from "../../components/common/footer";


const LaundriesIndex = () => {
    return (
        <>
            <Header/>
            <List/>
            <Footer/>
        </>
    );
}


export default LaundriesIndex