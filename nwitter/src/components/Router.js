import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from '../pages/Auth'
import Home from '../pages/Home';

function AppRouter({loggedIn}) {

    return <Router>
        <Switch>
            {loggedIn ?
                <Route path='/'>
                    <Home />
                </Route>
                : 
                <Route path='/'>
                    <Auth />
                </Route>
            }
        </Switch>
    </Router>
}

export default AppRouter;