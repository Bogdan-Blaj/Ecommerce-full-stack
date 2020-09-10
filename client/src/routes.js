import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Layout from './hoc/layout';
import RegisterLogin from './components/Register_login/index';
import Register from './components/Register_login/register';
import UserDashboard from './components/User';
import AuthenticationCheck from './hoc/auth';
import Shop from './components/shop';
import AddProduct from './components/User/Admin/add_products';
import ManageCategories from './components/User/Admin/manage_categories';
import ProductPage from './components/Product/index';
import UserCart from './components/User/cart';


const Routes = () => {
        return (
            <Layout>
                <Switch>
                    <Route path ="/" exact component = { AuthenticationCheck(Home, null) } />
                    <Route path ="/shop" exact component = { AuthenticationCheck(Shop, null) } />
                    <Route path ="/register" exact component = { AuthenticationCheck(Register, false) } />
                    <Route path ="/register_login" exact component = { AuthenticationCheck(RegisterLogin, false) } />
                    <Route path ="/product_detail/:id" exact component = { AuthenticationCheck(ProductPage, null) } />
                    <Route path ="/user/dashboard" exact component = { AuthenticationCheck(UserDashboard, true) } />
                    <Route path ="/user/cart" exact component = { AuthenticationCheck(UserCart, true) } />
                    <Route path ="/admin/add_product" exact component = { AuthenticationCheck(AddProduct, true) } />
                    <Route path ="/admin/manage_categories" exact component = { AuthenticationCheck(ManageCategories, true) } /> 

                </Switch>
            </Layout>
        )
}

export default Routes;