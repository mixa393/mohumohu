import {
    Router,
    Switch,
    Route,
} from "react-router";
import './css/App.css';
import Header from './components/common/header'
import Footer from './components/common/footer'
import UsersIndex from "./pages/users/index";
import LaundriesIndex from "./pages/laundries";

function App() {
    return (
        <Router>
            <Header/>
            <div className="App">
                <Switch>
                    <Route path={"/"}>
                        <UsersIndex/>
                    </Route>
                    <Route path={"/weekly"}>
                        <LaundriesIndex/>
                    </Route>
                    <Route path={"/register"}>
                        <UsersIndex/>
                    </Route>
                    <Route path={"/settings"}>
                        <UsersIndex/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </Router>

    );
}

export default App;
