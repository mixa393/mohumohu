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
            // data: Array(6)
            // 0: {id: 15, name: '彩花のシーツ', image: 'sheets', limitDays: -6}
            // 1: {id: 13, name: '空のマット', image: 'mat', limitDays: -5}
            // 2: {id: 14, name: '空のクッション', image: 'cushion', limitDays: -5}
            // 3: {id: 16, name: '彩花のタオル', image: 'bath-towel', limitDays: -5}
            // 4: {id: 10, name: '亮太の服', image: 'default', limitDays: -4}
            // 5: {id: 11, name: '亮太のカーテン', image: 'curtains', limitDays: 2}

        }catch (err){
            console.error(err)
        }
    }

    useEffect(() => {
        getLaundries().then()
    }, []);

    return (
        <>
            <ul>
                    <li>{
                        laundries.map((laundry,index) => {
                            return (
                                <LaundryItem
                                    key={index}
                                    id={laundry.id}
                                    name={laundry.name}
                                    image={laundry.image}
                                    limitDays={laundry.limitDays}
                                />
                            )
                        })
                    }</li>
            </ul>
        </>
    );
}

export default LaundryList