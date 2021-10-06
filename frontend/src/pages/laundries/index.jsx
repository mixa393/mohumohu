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
                <Link to="/laundries/add" className="bg-yellow-200 hover:bg-white p-3">新規追加</Link>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </Loading>
        </>
    )
}


export default LaundriesIndex