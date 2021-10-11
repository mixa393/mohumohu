import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getLaundryWeekly} from "../../lib/api/laundries";
import Loading from "../../components/common/loading"
import WeeklyHeader from "../../components/laundries/weeklyHeader";
import WeeklyItem from "../../components/laundries/weeklyItem";


const LaundriesWeekly = () => {
    // 洗濯物一覧
    const [laundries, setLaundries] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getLaundries = async () => {
        try {
            setIsLoading(true)
            const res = await getLaundryWeekly()
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
                <div className="pt-2 pb-2">
                    <h1 className="p-2 text-2xl font-black heading-image">WEEKLY</h1>
                </div>
                <div className="relative">
                    <div className="overflow-auto">
                        <table className="table-fixed laundries-table"
                               style={{width: '45rem'}}>
                            <thead>
                            <WeeklyHeader/>
                            </thead>
                            <tbody className="w-full">
                            {laundries.map((laundry, index) => {
                                return (
                                    <WeeklyItem
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
            </Loading>
        </>
    )
}


export default LaundriesWeekly