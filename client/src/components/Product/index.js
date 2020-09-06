import React, { Component } from 'react';
import PageTop from '../Utils/page_top';
import {getProductDetail, clearProductDetail} from '../../redux/actions/product_actions';

import { connect } from 'react-redux';
import ProdInfo from './prodInfo';
import ProdImg from './prodImg';


class ProductPage extends Component {

    componentDidMount(){
        //get id
        const id = this.props.match.params.id;
        console.log(id);
        this.props.dispatch(getProductDetail(id));
    }

    componentWillUnmount(){
        this.props.dispatch(clearProductDetail());
    }
    render() {
        return (
            <div>
            <PageTop
                title="Product detail"
            />
            <div className="container">
            {
                this.props.products.prodDetail ?
                <div className="product_detail_wrapper">
                    <div className="left">
                        <div style={{width:'500px'}}>
                            <ProdImg
                                detail={this.props.products.prodDetail}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <ProdInfo
                            addToCart ={(id) => this.addToCartHandler(id)}
                            detail = { this.props.products.prodDetail}
                        />
                    </div>
                </div>
                : 'Loading'
            }

            </div>                
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(ProductPage);