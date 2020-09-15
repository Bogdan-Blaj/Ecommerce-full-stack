import React, { Component } from 'react';
import UserLayout from '../../hoc/userLayout';
import { getCartItems, removeCartItem } from '../../redux/actions/user_actions';
import UserProductBlock from '../Utils/User/product_block';
import Paypal from '../Utils/paypal';

import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';


// AflV3rcXu9rsBGhV70vN_Fco3aYa5pNILCOl1NkVNkVf-OpkJzvNco6miKK9Je-9Dr_TqsoyuZV5zp0w
class UserCart extends Component {

    state ={
        loading : true,
        total : 0,
        showSuccess : false,
        showTotal : false
    }

    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                //get info from server
                //push id to array
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                });
                this.props.dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(() => {
                        if(this.props.user.cartDetail.length > 0){
                            this.calculateTotal(this.props.user.cartDetail);
                        }
                }) 
            }
        }

    }

    calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity;
        });

        this.setState({
            total,
            showTotal : true
        })

    }

    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id)).then( () => {
            if(this.props.user.cartDetail.length <= 0){
                this.setState({
                    showTotal : false
                })
            } else{
                this.calculateTotal(this.props.user.cartDetail);
            }
        })
    }

    showNoItemMessage = () =>(
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                You have no items
            </div>
        </div>
    )

    transactionError = (data) => {
        console.log('transaction error');
    }

    transactionCancel = (data) => {
        console.log('transaction calcel');
    }

    transactionSuccess = (data) => {
        console.log('transaction success');
        this.setState({
            showTotal : false,
            showSuccess : true
        })
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=> this.removeFromCart(id)}
                        />
                        {
                            this.state.showTotal ?
                                <div>
                                    <div className="user_cart_sum">
                                        <div>
                                            Total amount : $ {this.state.total}
                                        </div>
                                    </div>
                                </div>
                            : 
                            this.state.showSuccess ?
                            <div className="cart_success">
                                <FontAwesomeIcon icon={faSmile}/>
                                <div>
                                    THANK YOU
                                </div>
                                <div>
                                    YOUR ORDER IS NOW COMPLETE
                                </div>
                            </div>
                        :
                        this.showNoItemMessage()
                    }
                     </div>
                     {
                         this.state.showTotal ?
                            <div className="paypal_button_container">
                                <Paypal 
                                    toPay = {this.state.total}
                                    transactionError = {(data) => this.transactionError(data)}
                                    transactionCancel = {(data) => this.transactionCancel(data)}
                                    onSuccess = {(data) => this.transactionSuccess(data)}
                                />
                            </div>
                        : null
                     }
                </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);
