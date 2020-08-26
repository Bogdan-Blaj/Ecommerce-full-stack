import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../redux/actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

/*
Reload will be 
true if route is private
false if is dependent of user status but not private
null if public
*/
export default function(ComposedClass, reload, adminRoute = null){
    class AuthenticationCheck extends Component {

        state = {
            loading : true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                //getting from map state to props
                let user = this.props.user.userData;
                 console.log(user + "1");
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login');
                    }
                } else {
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard');
                    }else {
                        if(reload === false){
                            this.props.history.push('/user/dashboard');
                        }
                    }

                   
                }
                this.setState({loading : false})
            })
        }

        render() {
            if(this.state.loading){
                return (
                    <div className="main_loader">
                        <CircularProgress style = {{color : '#2196F3'}} thickness = {7} />
                    </div>
                )
            }
            return (
                <div>
                    <ComposedClass {...this.props} user = { this.props.user} />
                </div>
            );
        }
    }

    function mapStateToProps(state){
        return {
            user : state.user
        }
    }

   return connect(mapStateToProps)(AuthenticationCheck);
}

