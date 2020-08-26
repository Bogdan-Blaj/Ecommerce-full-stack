import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Layout from './hoc/layout';
import RegisterLogin from './components/Register_login/index';
import Register from './components/Register_login/register';
import UserDashboard from './components/User';
import AuthenticationCheck from './hoc/auth';



const Routes = () => {
        return (
            <Layout>
                <Switch>
                    <Route path ="/" exact component = { AuthenticationCheck(Home, null) } />
                    <Route path ="/user/dashboard" exact component = { AuthenticationCheck(UserDashboard, true) } />
                    <Route path ="/register" exact component = { AuthenticationCheck(Register, false) } />
                    <Route path ="/register_login" exact component = { AuthenticationCheck(RegisterLogin, false) } />
                </Switch>
            </Layout>
        )
}

export default Routes;