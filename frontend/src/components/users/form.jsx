// import React, {useState, useEffect} from "react"
// import {createUser} from "../../lib/api/users"
// import {createTeam} from "../../lib/api/teams"
// import locationId from "../../lib/api/locationId.json"
//
// export const Form = () => {
//     const [location, setLocation] = useState({
//         local: "",
//         pref: ""
//     })
//
//     const [teamInfo, setTeamInfo] = useState({
//         name:"",
//         locationId: ""
//     })
//
//     const [userInfo, setUserInfo] = useState({
//         name: "",
//         email: "",
//         password: "",
//         password_confirmation: "",
//         remind_at: ""
//     })
//
//     const handleCreateUser = async (e) => {
//         e.preventDefault()
//
//         // TODO: チームの作成処理
//         try {
//             const resTeam = await createTeam(teamInfo)
//             const team_id = resTeam.data.id
//
//             const userData = {
//                 ...userInfo,
//                 team_id
//             }
//
//             const res = await createUser(userData)
//             console.log(res)
//
//             if (res.status === 200) {
//                 setUsers([...users, res.data.user])
//                 // TODO: 画面遷移を入れる
//             } else {
//                 console.log(res.data.message)
//             }
//         } catch (err) {
//             console.log(err)
//         }
//
//         setUserInfo("")
//     }
//
//     return (
//         <form onSubmit={handleCreateUser}>
//             <input
//                 type="hidden"
//                 value={`${userInfo.name}のチーム`}
//                 onChange={(e) => {
//                     setTeamInfo({name: e.target.value})
//                 }}
//             />
//
//             <label for={"name"}>名前</label>
//             <input
//                 id={"name"}
//                 type="text"
//                 value={userInfo.name}
//                 onChange={(e) => {
//                     setUserInfo(e.target.value)
//                 }}
//             />
//             <input
//                 type="text"
//                 value={userInfo.mail}
//                 onChange={(e) => {
//                     setUserInfo(e.target.value)
//                 }}
//             />
//             <input
//                 type="text"
//                 value={userInfo.password}
//                 onChange={(e) => {
//                     setUserInfo(e.target.value)
//                 }}
//             />
//             <input
//                 type="text"
//                 value={userInfo.password_confirmation}
//                 onChange={(e) => {
//                     setUserInfo(e.target.value)
//                 }}
//             />
//             <input
//                 type="text"
//                 value={userInfo.remind_at}
//                 onChange={(e) => {
//                     setUserInfo(e.target.value)
//                 }}
//             />
//             <select onChange={(e) => {
//                 setLocation({local: e.target.value})
//             }}>
//                 {
//                     locationId.keys().map(local => <option value={local}>{local}</option>)
//                 }
//             </select>
//             {location.local && (
//                 <select onChange={setLocation({pref: e.target.value})}>
//                     {
//                         (location.local?.length > 0) && (locationId[location.local].map(pref => <option
//                             value={pref}>{pref}</option>))
//                     }
//                 </select>
//             )
//             }
//             {location.pref && (
//                 <select onChange={setTeamInfo({locationId: locationId[location.local][location.pref][e.target.value]})}>
//                     {
//                         (location.pref?.length > 0) && (locationId[location.pref].map(city => <option
//                             value={locationId[location.local][location.pref][city]}>{city}</option>))
//                     }
//                 </select>
//             )
//             }
//
//             <input type="submit" value="Add" disabled={!title}/>
//         </form>
//     )
// }
//
// export default Form