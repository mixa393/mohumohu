import React from "react"

const List = () => {
    return (
        <>
            <table className="table-fixed laundries-table">
                <thead>
                <tr className="h-32">
                    <th className="w-32 border-2 border-dotted border-gray-100">アイテム</th>
                    <th className="w-24 border-2 border-dotted border-gray-100">今日</th>
                    <th className="w-24 border-2 border-dotted border-gray-100">明日</th>
                    <th className="w-24 border-2 border-dotted border-gray-100">3日後</th>
                    <th className="w-24 border-2 border-dotted border-gray-100">4日後</th>
                    <th className="w-24 border-2 border-dotted border-gray-100">5日後</th>
                    <th className="w-24 border-2 border-dotted border-gray-100">6日後</th>
                    <th className="w-24 border-2 border-dotted border-gray-100">7日後</th>
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
                    <td>アイテム名</td>
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
        </>
    )
}

export default List