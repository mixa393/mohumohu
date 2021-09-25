import React,{useEffect,useState} from "react";
import LaundryItem from "./laundryItem"
import {getLaundryList} from "../../lib/api/laundries";
import {signIn} from "../../lib/api/auth";


const LaundryList = () => {
    const [laundries, setLaundries] = useState([]);

    const getLaundries = async () =>{
        try {
            const res = await getLaundryList()
            console.log(res)
            setLaundries(res.data.data)
        }catch (err){
            console.error(err)
        }
    }
    const update = async () => {
        await getLaundries()
    }

    useEffect(() => {
        getLaundries().then()
    }, []);

    return (
        <>
            <ul>
                    <li className="h-20 max-h-20">{
                        laundries.map((laundry,index) => {
                            return (
                                <LaundryItem
                                    key={index}
                                    id={laundry.id}
                                    name={laundry.name}
                                    image={laundry.image}
                                    isDisplayed={laundry.isDisplayed}
                                    limitDays={laundry.limitDays}
                                    update={update}
                                />
                            )
                        })
                    }</li>
            </ul>
        </>
    );
}

export default LaundryList