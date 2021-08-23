import React from "react";
import {laundryItem} from "./laundryItem"
import tops01 from "../../images/laundries/tops01.png"

const LaundryList= () => {
    return (
        <ul>
            {/*<li>{*/}
            {/*    laundries.map((user, index) => {*/}
            {/*        return (*/}
            {/*            <laundryItem*/}
            {/*                key={index}*/}
            {/*                user={user}*/}
            {/*                setUsers={setUsers}*/}
            {/*            />*/}
            {/*        )*/}
            {/*    })*/}
            {/*}</li>*/}
            <li>
                <div className="list-item flex items-end w-24 h-24"><p>トップス</p></div>
                <p>あと3日</p>
            </li>
        </ul>
    );
}


export default LaundryList