import React, {useEffect, useState} from "react"
import dayjs from "dayjs";
import ListItem from "./listItem";
import {getLaundryIndex} from "../../lib/api/laundries";

const List = () => {
    const [date, setDate] = useState({
        threeDaysLater: "",
        fourDaysLater: "",
        fiveDaysLater: "",
        sixDaysLater: "",
        sevenDaysLater: ""
    })

    useEffect(() => {
        const today = dayjs()
        setDate({
            threeDaysLater: today.add(3, "d").format('MM/DD'),
            fourDaysLater: today.add(4, "d").format('MM/DD'),
            fiveDaysLater: today.add(5, "d").format('MM/DD'),
            sixDaysLater: today.add(6, "d").format('MM/DD'),
            sevenDaysLater: today.add(7, "d").format('MM/DD')
        })
    }, [])

    // 洗濯物一覧
    const [laundries, setLaundries] = useState([]);

    const getLaundries = async () =>{
        try {
            const res = await getLaundryIndex()
            console.log(res)
            setLaundries(res.data.data)
        }catch (err){
            console.error(err)
        }
    }

    useEffect(() => {
        getLaundries().then()
    }, []);

    // const [tableHeader, setTableHeader] = useState("")


    return (
        <>
            <div className="relative">
                <p>新規追加</p>
                <div className="overflow-auto w-full">
                    <table className="table-fixed laundries-table whitespace-nowrap min-w-full"
                           style={{width: '70rem'}}>
                        <thead>
                        <tr className="h-32">
                            <th className="border-2 border-dotted border-gray-100">アイテム</th>
                            <th className="border-2 border-dotted border-gray-100">今日</th>
                            <th className="border-2 border-dotted border-gray-100">明日</th>
                            <th className="border-2 border-dotted border-gray-100">{date.threeDaysLater}</th>
                            <th className="border-2 border-dotted border-gray-100">{date.fourDaysLater}</th>
                            <th className="border-2 border-dotted border-gray-100">{date.fiveDaysLater}</th>
                            <th className="border-2 border-dotted border-gray-100">{date.sixDaysLater}</th>
                            <th className="border-2 border-dotted border-gray-100">{date.sevenDaysLater}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {laundries.map((laundry,index) => {
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