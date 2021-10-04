import React, {useEffect, useState} from "react"
import ListHeader from "./listHeader";
import ListItem from "./listItem";
import {getLaundryIndex} from "../../lib/api/laundries";

const List = () => {
    // 洗濯物一覧
    const [laundries, setLaundries] = useState([]);

    const getLaundries = async () => {
        try {
            const res = await getLaundryIndex()
            console.log(res)
            setLaundries(res.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getLaundries().then()
    }, [])

    return (
        <>
            <div className="relative">
                <div className="overflow-auto w-full">
                    <table className="table-fixed laundries-table min-w-full w-full"
                           style={{width: '45rem'}}>
                        <thead>
                        <ListHeader/>
                        </thead>
                        <tbody className="w-full">
                        {laundries.map((laundry, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    id={laundry.id}
                                    name={laundry.name}
                                    image={laundry.image}
                                    weekly={laundry.weekly}
                                />
                            )
                        })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default List