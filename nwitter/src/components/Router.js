import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../pages/Auth'
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Navigation from "./Navigation";

function AppRouter({ loggedIn, userObj }) {

    return <Router>
        {loggedIn && <Navigation />}
        <Switch>
            {loggedIn ?
                <>
                <Route exact path='/'>
                    <Home userObj={userObj} />
                </Route>
                <Route exact path='/profile'>
                    <Profile />
                </Route>
                </>
                : 
                <>
                <Route exact path='/'>
                    <Auth />
                </Route>
                <Redirect from='*' to='/' />
                </>
            }
        </Switch>
    </Router>
}

export default AppRouter;