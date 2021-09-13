import {useEffect, useState} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    useLocation
} from "react-router-dom";
import './css/App.css';

import Header from './components/common/header'
import Footer from './components/common/footer'
import UsersIndex from "./pages/users/index";
import LaundriesIndex from "./pages/laundries";

import {getCurrentUser} from "./lib/api/auth";

function App() {
    const location = useLocation();
    useEffect(() => {
        return () => {

        };
    }, [location]);
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState("")

    // 認証済みのユーザーがいるかどうかチェック
    // 確認できた場合はそのユーザーの情報を取得
    const handleGetCurrentUser = async () => {
        try {
            const res = await getCurrentUser()

            if (res?.data.isLogin === true) {
                setIsSignedIn(true)
                setCurrentUser(res?.data.data)

                console.log(res?.data.data)
            } else {
                console.log("No current user")
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        handleGetCurrentUser()
    }, [setCurrentUser])


    // ユーザーが認証済みかどうかでルーティングを決定
    // 未認証だった場合は「/signin」ページに促す
    const Private = ({ children }) => {
        if (!loading) {
            if (isSignedIn) {
                return children
            } else {
                return <Redirect to="/signin" />
            }
        } else {
            return <></>
        }
    }

    return (
        <BrowserRouter>
            <div className="App flex flex-col">
                <Header/>
                <div className="flex-1">
                    <Switch>
                        <Route exact path="/">
                            <UsersIndex/>
                        </Route>
                        <Route path="/laundries">
                            <LaundriesIndex/>
                        </Route>
                        <Route path="/settings">
                            <div>設定</div>
                        </Route>
                        {/*TODO:認証後では関連*/}
                        <Route path="/login">
                            <div>ログイン画面予定</div>
                        </Route>
                        <Route path="/logout">
                            <div>ログアウト予定</div>
                        </Route>

                    </Switch>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
