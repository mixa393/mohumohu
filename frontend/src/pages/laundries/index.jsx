import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getLaundryIndex} from "../../lib/api/laundries";
import Loading from "../../components/common/loading"
import ListItem from "../../components/laundries/listItem";
import "../../css/laundries.css"
import Heading from "../../components/common/heading";

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
                <Heading content="洗濯物一覧"/>
                <ul className="w-4/5 mt-4 mb-8 mx-auto">
                    {laundries.map((laundry, index) => {
                        return (
                            <ListItem
                                key={index}
                                id={laundry.id}
                                name={laundry.name}
                                image={laundry.image}
                            />
                        )
                    })
                    }
                </ul>
                <Link to="/laundries/add"
                      className="block bg-yellow-300 py-2 w-3/5 text-white mx-auto mb-10 border-b-4 border-yellow-500 rounded-xl font-black">
                    追加
                    <span className="text-2xl ml-2">+</span>
                </Link>
            </Loading>
        </>
    )
}


export default LaundriesIndex