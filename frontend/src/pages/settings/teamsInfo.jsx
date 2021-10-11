import React, {useContext, useState, useEffect, useCallback} from "react";
import locationId from "../../lib/api/locationId";
import {getTeam, updateTeam} from "../../lib/api/teams";
import Loading from "../../components/common/loading";
import Button from "../../components/common/button";
import {AuthContext} from "../../App";
import {useHistory} from "react-router-dom";
import Tooltip from "../../components/common/tooltip";
import Heading from "../../components/common/heading";


const TeamsInfo = () => {
    const {currentUser} = useContext(AuthContext)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [currentTeam, setCurrentTeam] = useState("")
    const [isDisplayedForm, setIsDisplayedForm] = useState(false)

    const [name, setName] = useState("")

    const [location, setLocation] = useState({
        local: "",
        pref: "",
        city: ""
    })

// 認証済みのユーザーがいるかどうかチェック
// 確認できた場合はそのユーザーの情報を取得
    const handleGetCurrentTeam = async () => {
        setLoading(true)
        try {
            const res = await getTeam(currentUser.teamId)

            if (res) {
                setCurrentTeam(res?.data.data)
                setName(res?.data.data.name)
                setLocation(getLocationData(res?.data.data.locationId))
                console.log(location)
                console.log(res?.data.data)
            } else {
                console.log("No current team")
            }
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const getLocationName = useCallback(
        (id) => {
            const {pref, city} = getLocationData(id)
            return `${pref}${city}`
        },
        [],
    );



    const getLocationData = (id) => {
        for (const local in locationId) {
            for (const pref in locationId[local]) {
                for (const city in locationId[local][pref]) {
                    if (locationId[local][pref][city] === id) {
                        return {local, pref, city}
                    }
                }
            }
        }
        return {
            local: '',
            pref: '',
            city: ''
        }
    }


    useEffect(() => {
        const abortController = new AbortController()
        handleGetCurrentTeam().then()
        getLocationName()
        return () => {
            abortController.abort()
        };
    }, []);


    const handleUpdateTeam = async (e) => {
        e.preventDefault()

        const teamParams = {}

        if (name) {
            teamParams.name = name
        }
        if (location.city) {
            teamParams.locationId = locationId
        }

        const res = await updateTeam(currentTeam.id, teamParams)
        console.log(res)

        if (res.status === 200) {
            console.log("データが変更されました")
            console.log("res.data.data")
        }
        setIsDisplayedForm(false)
        history.push("/settings/team")
    }

    const contents = (isDisplayedForm) => {
        if (isDisplayedForm) {
            return (
                <>
                    <form onSubmit={handleUpdateTeam}
                          className="w-3/4 mx-auto">
                        <div className="mt-6 w-full mx-auto">
                            <label htmlFor="name" className="text-left block">チーム名</label>
                            <input type="text" id="name" name="name"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   defaultValue= {name}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}/>

                        </div>

                        <div className="mt-6 w-full mx-auto">
                            <label htmlFor="locationId" className="text-left block">
                                天気を表示する地域
                                <Tooltip content="お住まいの地域の天気予報を表示します"/>
                            </label>
                            <select className="mt-2 bg-gray-100 p-2 w-full"
                                    onChange={(e) => {
                                        setLocation({local: e.target.value})
                                    }}>
                                <option value=""/>
                                {
                                    Object.keys(locationId).map(local => <option key={local} value={local}
                                                                                 selected={location.local}>{local}</option>)
                                }
                            </select>

                            <select className="mt-2 bg-gray-100 p-2 w-full"
                                    onChange={(e) => {
                                        setLocation({...location, pref: e.target.value})
                                    }}>
                                <option value=""/>
                                {
                                    (location.local?.length > 0) && (Object.keys(locationId[location.local])
                                        .map(pref => (
                                            <option key={pref} value={pref} selected={location.pref}>{pref}</option>)))
                                }
                            </select>


                            <select className="mt-2 bg-gray-100 p-2 w-full"
                                    onChange={(e) => {
                                        setLocation({...location, city: e.target.value})
                                    }}>
                                <option value=""/>
                                {
                                    (location.pref?.length > 0) && (Object.keys(locationId[location.local][location.pref])
                                        .map(city => (
                                            <option key={city} value={city} selected={location.city}>{city}</option>)))
                                }
                            </select>
                        </div>

                        <div className="mt-8 space-x-4">
                            <Button color="yellow" func={handleUpdateTeam} value="変更する" option="w-2/5"/>
                            <Button color="gray" func={() => {
                                setIsDisplayedForm(false)
                            }} value="戻る" option="w-2/5"/>
                        </div>
                    </form>
                </>
            )
        } else {
            return (
                <>
                    <div className="flex flex-col justify-around h-2/5 mt-4 w-3/4 mx-auto">
                        <div className="mt-6 w-full mx-auto">
                            <h2 className="text-left">チーム名</h2>
                            <p className="bg-gray-100 p-2">{currentTeam.name}</p>
                        </div>

                        <div className="mt-6 w-full mx-auto">
                            <h2 className="text-left">天気を表示する地域</h2>
                            <p className="bg-gray-100 p-2">{getLocationName(currentTeam.locationId)}</p>
                        </div>

                        <Button color="yellow" func={() => {
                            setIsDisplayedForm(true)
                        }} value="変更する" option="w-2/5 mt-8"/>
                    </div>
                </>
            )
        }
    }


    return (
        <div style={{minHeight: 'calc(100vh - 5.5rem - 18rem)'}} className="pt-2">
            <Loading isLoading={loading}>
                <Heading content="チーム"/>
                {contents(isDisplayedForm)}
            </Loading>
        </div>
    )
}

export default TeamsInfo