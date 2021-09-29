import React, {useContext} from "react";
import {AuthContext} from "../../App";

const Setting = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <>
            <h1>ユーザー情報</h1>
            <p>{currentUser.name}</p>
            <p>{currentUser.email}</p>
            <p>{currentUser.remindAt}</p>
            {/*<p>{currentUser.password}</p>*/}
        </>
    )
}

export default Setting