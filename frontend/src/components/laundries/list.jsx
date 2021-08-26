import React,{useEffect,useState} from "react"
import dayjs from "dayjs";

const List = () => {
    const today = dayjs()
    const [date, setDate] = useState({
        threeDaysLater:"",
        fourDaysLater: "",
        fiveDaysLater: "",
        sixDaysLater: "",
        sevenDaysLater: ""
    })

    useEffect(() => {
        setDate({
            threeDaysLater: today.add(3, "d").format('MM/DD'),
            fourDaysLater: today.add(4, "d").format('MM/DD'),
            fiveDaysLater: today.add(5, "d").format('MM/DD'),
            sixDaysLater: today.add(6, "d").format('MM/DD'),
            sevenDaysLater: today.add(7, "d").format('MM/DD')
        })
    }, [today])

    return (
        <>
            <div className="relative">
                <table className="table-fixed laundries-table fixed">
                    <thead>
                    <tr className="h-32">
                        <th className="w-32 border-2 border-dotted border-gray-100">アイテム</th>
                    </tr>
                    <tr className="h-32">
                        <th className="w-32 border-2 border-dotted border-gray-100">アイテム</th>
                    </tr>
                    <tr className="h-32">
                        <th className="w-32 border-2 border-dotted border-gray-100">アイテム</th>
                    </tr>
                    <tr className="h-32">
                        <th className="w-32 border-2 border-dotted border-gray-100">アイテム</th>
                    </tr>
                    </thead>
                </table>
                <table className="table-fixed laundries-table overflow-x-scroll whitespace-nowrap">
                    <thead>
                    <tr className="h-32">
                        <th className="w-32 border-2 border-dotted border-gray-100">アイテム</th>
                        <th className="w-24 border-2 border-dotted border-gray-100">今日</th>
                        <th className="w-24 border-2 border-dotted border-gray-100">明日</th>
                        <th className="w-24 border-2 border-dotted border-gray-100">{date.threeDaysLater}</th>
                        <th className="w-24 border-2 border-dotted border-gray-100">{date.fourDaysLater}</th>
                        <th className="w-24 border-2 border-dotted border-gray-100">{date.fiveDaysLater}</th>
                        <th className="w-24 border-2 border-dotted border-gray-100">{date.sixDaysLater}</th>
                        <th className="w-24 border-2 border-dotted border-gray-100">{date.sevenDaysLater}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-pink-100 h-32">
                        <td className="border-2 border-dotted border-gray-100">アイテム名</td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                    </tr>
                    <tr className="h-32">
                        <td>アイテム名</td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                    </tr>
                    <tr className="bg-pink-100">
                        <td>アイテム名</td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                        <td className="border-2 border-dotted border-gray-100"></td>
                    </tr>
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
        </>
    )
}

export default List