import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout';

import FormField from '../../Utils/Form/formField';
import { update, generateData, isFormValid } from '../../Utils/Form/formField';
import { connect } from 'react-redux';
import {getBrands, getWood} from '../../../redux/actions/product_actions';


class AddProduct extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config:{
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config:{
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config:{
                    label: 'Product Brand',
                    name: 'brands_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config:{
                    label: 'Shipping',
                    name: 'shipping_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config:{
                    label: 'Available, in stock',
                    name: 'available_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config:{
                    label: 'Wood material',
                    name: 'wood_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config:{
                    label: 'Frets',
                    name: 'frets_input',
                    options:[
                        {key:20,value:20},
                        {key:21,value:21},
                        {key:22,value:22},
                        {key:24,value:24}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config:{
                    label: 'Publish',
                    name: 'publish_input',
                    options:[
                        {key:true,value:'Public'},
                        {key:false,value:'Hidden'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            }
        }
    }

    render() {
        return (
           <UserLayout>
                <div>
                    <h1>Add product</h1>
                    
                    <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormField id = {'name'} formData = { this.state.formdata.name} change = { (element => this.updateForm(element)) } 
                    />

                    </form>
                </div>
           </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products : state.products
    }
}

export default connect(mapStateToProps)(AddProduct);