import React, { Component } from 'react';
import PageTop from '../Utils/page_top';
import { connect } from 'react-redux';
import { getProductsToShop, getWoods, getBrands} from '../../redux/actions/product_actions';
import { frets, price } from '../Utils/Form/fixed_categories';

import CollapseCheckbox from '../Utils/collapseCheckbox.js';
import CollapseRadio from '../Utils/collapseRadio.js';
class Shop extends Component {

    state = {
        grid:'',
        limit:6,
        skip:0,
        filters:{
            brand:[],
            frets:[],
            wood:[],
            price:[]
        }
    }

    componentDidMount(){
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }

    handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array
            }
        }
        return array;
    }

    handleFilters = (filters,category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;
 
         if(category === "price"){
             let priceValues = this.handlePrice(filters);
             newFilters[category] = priceValues
         }
 
        this.showFilteredResults(newFilters)
        this.setState({
            filters: newFilters
        })
     }

     showFilteredResults = (filters) =>{
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip:0
            })
        })
    }

    render() {
        const products = this.props.products;
        console.log(this.state.filters);
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />

                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                        <CollapseCheckbox
                            initState={true}
                            title="Brands"
                            list={products.brands}
                            handleFilters={(filters)=> this.handleFilters(filters,'brand')}
                        />
                        <CollapseCheckbox
                            initState={false}
                            title="Woods"
                            list={products.woods}
                            handleFilters={(filters)=> this.handleFilters(filters,'wood')}
                    />
                        <CollapseCheckbox
                            initState={false}
                            title="Frets"
                            list={frets}
                            handleFilters={(filters)=> this.handleFilters(filters,'brand')}
                    />
                        <CollapseRadio
                            initState={true}
                            title="Price"
                            list={price}
                            handleFilters={(filters)=> this.handleFilters(filters,'price')}
                        />
 
                        </div>
                        <div className="right">
                            right
                        </div>
                    </div>
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

export default connect(mapStateToProps)(Shop);