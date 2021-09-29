import {useEffect, useState, createContext} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ReactLoading from 'react-loading';

import './css/App.css';

import Header from './components/common/header'
import Footer from './components/common/footer'
import UsersIndex from "./pages/users/index";
import LaundriesIndex from "./pages/laundries";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

import {getCurrentUser} from "./lib/api/auth";


/**
 * グローバルで扱う変数・関数
 * @type {React.Context<{isSignedIn, setIsSignedIn, currentUser, setCurrentUser}>}
 */
export const AuthContext = createContext({
    loading: undefined, setLoading:undefined,
    isSignedIn: undefined, setIsSignedIn: undefined,
    currentUser: undefined, setCurrentUser: undefined,
})

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [loading, setLoading] = useState(true)

    // 認証済みのユーザーがいるかどうかチェック
    // 確認できた場合はそのユーザーの情報を取得
    const handleGetCurrentUser = async () => {
        try {
            const res = await getCurrentUser()

            console.log(res);
            if (res?.data.isLogin === true) {
                setIsSignedIn(true)
                setCurrentUser(res?.data.data)
                console.log(res?.data.data)
            } else {
                console.log("No current user")
            }
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        handleGetCurrentUser().then()
    }, [setCurrentUser])


    // ユーザーが認証済みかどうかでルーティングを決定
    // 未認証だった場合は「/signin」ページに促す
    const Private = ({children}) => {
        if (loading){
            return <ReactLoading type="spin" color="#ffffff" height={'20%'} width={'20%'} />
        } else if (!loading && isSignedIn) {
            return children
        } else {
            return <Redirect to="/signin"/>
        }
    }

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{loading,setLoading,isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
                <div className="App flex flex-col text-gray-800">
                    <Header/>
                    <div className="flex-1">
                        <Switch>
                            <Route exact path="/signup" component={SignUp}/>
                            <Route exact path="/signin" component={SignIn}/>
                            <Private>
                                <Route exact path="/">
                                    <UsersIndex/>
                                </Route>
                                <Route path="/laundries">
                                    <LaundriesIndex/>
                                </Route>
                                <Route path="/settings">
                                    <div>設定</div>
                                </Route>
                            </Private>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
