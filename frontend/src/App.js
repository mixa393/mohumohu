import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import './css/App.css';
import Header from './components/common/header'
import Footer from './components/common/footer'
import UsersIndex from "./pages/users/index";
import LaundriesIndex from "./pages/laundries";

function App() {
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
