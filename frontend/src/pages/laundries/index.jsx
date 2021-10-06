import React from "react";
import List from "../../components/laundries/list";
import {Link} from "react-router-dom";


const LaundriesIndex = () => {


    return (
        <>
            <Link to="/laundries/add" className="bg-yellow-200 hover:bg-white p-3">新規追加</Link>
            <List/>
        </>
    );
}


export default LaundriesIndex