import React, {useEffect, useState} from "react"
import dayjs from "dayjs";
import ListItem from "./listItem";

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

    const [tableHeader, setTableHeader] = useState("")


    return (
        <>
            <div className="relative">
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

                        <ListItem/>
                        <ListItem/>
                        <tr>
                            <td>新規追加</td>
                            <td className="border-2 border-dotted border-gray-100"></td>
                            <td className="border-2 border-dotted border-gray-100"></td>
                            <td className="border-2 border-dotted border-gray-100"></td>
                            <td className="border-2 border-dotted border-gray-100"></td>
                            <td className="border-2 border-dotted border-gray-100"></td>
                            <td className="border-2 border-dotted border-gray-100"></td>
                            <td className="border-2 border-dotted border-gray-100"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default List