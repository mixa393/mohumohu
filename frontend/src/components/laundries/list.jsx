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
                    <table className="table-fixed laundries-table whitespace-nowrap min-w-full"
                           style={{width: '70rem'}}>
                        <thead>
                        <ListHeader/>
                        </thead>
                        <tbody>
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