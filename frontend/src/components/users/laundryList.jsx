import React from "react";
import LaundryItem from "./laundryItem"


const LaundryList = () => {
    return (
        <>
            <ul>
                <li>
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
                    <LaundryItem/>
                </li>
            </ul>
        </>
    );
}

export default LaundryList