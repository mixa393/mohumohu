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
import Form from "./pages/laundries/form"
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

import {getCurrentUser} from "./lib/api/auth";
import TeamsInfo from "./pages/settings/teamsInfo";
import UsersInfo from "./pages/settings/usersInfo";


/**
 * グローバルで扱う変数・関数
 * @type {React.Context<{isSignedIn, setIsSignedIn, currentUser, setCurrentUser}>}
 */
export const AuthContext = createContext({
    loading: undefined, setLoading: undefined,
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

            if (res?.data?.isLogin === true) {
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
        if (loading) {
            return (
                <div className="h-full w-full">
                    <ReactLoading type="spinningBubbles" color="#ffdfe5" height={'20%'} width={'20%'}
                                  className="mx-auto mt-32"/>
                </div>
            )
        } else if (!loading && isSignedIn) {
            return (<>
                    <Header/>
                    <main className="mt-16 mb-4">
                        {children}
                    </main>
                    <Footer/>
                </>
            )
        } else {
            return <Redirect to="/signin"/>
        }
    }

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
                <div className="App flex flex-col min-h-screen text-gray-800">
                    <Switch>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/signin" component={SignIn}/>
                        <Private>
                            <Route exact path="/">
                                <UsersIndex/>
                            </Route>
                            <Route exact path="/laundries">
                                <LaundriesIndex/>
                            </Route>
                            <Route exact path="/laundries/add" component={Form} />
                            <Route exact path="/laundries/:id(\d+)" component={Form} />
                            <Route exact path="/settings/team">
                                <TeamsInfo/>
                            </Route>
                            <Route exact path="/settings/user">
                                <UsersInfo/>
                            </Route>
                        </Private>
                    </Switch>
                </div>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
