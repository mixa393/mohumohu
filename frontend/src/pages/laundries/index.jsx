import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getLaundryIndex} from "../../lib/api/laundries";
import Loading from "../../components/common/loading"
import ListHeader from "../../components/laundries/listHeader";
import ListItem from "../../components/laundries/listItem";


const LaundriesIndex = () => {
    // 洗濯物一覧
    const [laundries, setLaundries] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getLaundries = async () => {
        try {
            setIsLoading(true)
            const res = await getLaundryIndex()
            console.log(res)
            setLaundries(res.data.data)
            setIsLoading(false)
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getLaundries().then()
    }, [])

    return (
        <>
            <Loading isLoading={isLoading}>
                <h1 className="p-2 text-2xl background--sunny font-black text-white">WEEKLY</h1>
                <div className="relative">
                    <div className="overflow-auto">
                        <table className="table-fixed laundries-table"
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
                                        days={laundry.days}
                                        washAt={laundry.washAt}
                                        description={laundry.description}
                                        weekly={laundry.weekly}
                                    />
                                )
                            })
                            }
                            <tr className="h-16">
                                <th className="h-full">
                                    <Link to="/laundries/add" className="block bg-yellow-400 p-2 text-white m-auto hover:bg-yellow-300 rounded-xl">
                                        新規追加
                                        <span className="text-2xl ml-2">+</span>
                                    </Link>
                                </th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Loading>
        </>
    )
}


export default LaundriesIndex