import {useContext, useState, useEffect} from "react";
import locationId from "../../lib/api/locationId";
import {getTeam, updateTeam} from "../../lib/api/teams";
import Loading from "../../components/common/loading";
import {AuthContext} from "../../App";
import {useHistory} from "react-router-dom";

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
                console.log(res?.data.data)
            } else {
                console.log("No current team")
            }
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const getLocationName = (id) => {
        const {pref, city} = getLocationData(id) ?? {pref:'', city:''}
        return `${pref}${city}`
    }


    const getLocationData = (id) => {
        for (const local in locationId) {
            for (const pref in locationId[local]) {
                for (const city in locationId[local][pref]) {
                    if (locationId[local][pref][city] === id) {
                        return {local,pref,city}
                    }
                }
            }
        }
        console.log(`tasta: ${id}`)
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
                          className="flex flex-col justify-around h-1/2 mt-4 w-3/4 mx-auto">
                        <div className="w-full mx-auto">
                            <label htmlFor="name" className="text-left block">チーム名</label>
                            <input type="text" id="name" name="name"
                                   className="bg-gray-100 p-2 w-full focus:outline-none focus:ring"
                                   value={name}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}/>

                        </div>

                        <div className="w-full mx-auto">
                            <label htmlFor="locationId" className="text-left block">
                                天気を表示する地域
                            </label>
                            <select className="mt-2 bg-gray-100 p-2 w-full"
                                    onChange={(e) => {
                                        setLocation({local: e.target.value})
                                    }}>
                                <option value=""/>
                                {
                                    Object.keys(locationId).map(local => <option key={local}
                                                                                 value={local}>{local}</option>)
                                }
                            </select>

                            <select className="mt-2 bg-gray-100 p-2 w-full"
                                    onChange={(e) => {
                                        setLocation({...location, pref: e.target.value})
                                    }}>
                                <option value=""/>
                                {
                                    (location.local?.length > 0) && (Object.keys(locationId[location.local])
                                        .map(pref => (<option key={pref} value={pref}>{pref}</option>)))
                                }
                            </select>


                            <select className="mt-2 bg-gray-100 p-2 w-full"
                                    onChange={(e) => {
                                        setLocation({...location, city: e.target.value})
                                    }}>
                                <option value=""/>
                                {
                                    (location.pref?.length > 0) && (Object.keys(locationId[location.local][location.pref])
                                        .map(city => (<option key={city} value={city}>{city}</option>)))
                                }
                            </select>
                        </div>

                        <input type="submit"
                               onClick={handleUpdateTeam}
                               value="変更"
                               className="bg-blue-300 max-w-1/2 mx-auto py-2 px-6 rounded-xl border-b-4 border-blue-500 hover:bg-blue-400"/>
                    </form>

                    <button onClick={() => {
                        setIsDisplayedForm(false)
                    }}
                            className="bg-gray-200 max-w-1/2 mx-auto py-2 px-6 rounded-xl border-b-4 border-gray-400 hover:bg-gray-400">
                        戻る
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <div className="flex flex-col justify-around h-2/5 mt-4 w-3/4 mx-auto">
                        <div className="w-full mx-auto">
                            <h2 className="text-left">チーム名</h2>
                            <p className="bg-gray-100 p-2">{currentTeam.name}</p>
                        </div>

                        <div className="w-full mx-auto">
                            <h2 className="text-left">天気を表示する地域</h2>
                            <p className="bg-gray-100 p-2">{getLocationName(currentTeam.locationId)}</p>
                        </div>

                        <button onClick={() => {
                            setIsDisplayedForm(true)
                        }}
                                className="bg-blue-300 max-w-1/2 mx-auto p-3 rounded-xl border-b-4 border-blue-600 hover:bg-blue-400">
                            変更する
                        </button>
                    </div>
                </>
            )
        }
    }


    return (
        <div className="h-screen">
            <Loading isLoading={loading}>
                <h1 className="text-xl mt-4">チーム情報</h1>
                {contents(isDisplayedForm)}
            </Loading>
        </div>
    )
}

export default TeamsInfo