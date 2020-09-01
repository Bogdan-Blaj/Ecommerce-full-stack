import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout';

import FormField from '../../Utils/Form/formField';
import { update, generateData, isFormValid, populateOptionFields } from '../../Utils/Form/formActions';
import { connect } from 'react-redux';
import {getBrands, getWoods} from '../../../redux/actions/product_actions';


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


    updateFields = (newFormData) => {
        this.setState({
            formdata : newFormData
        })
    }

    componentDidMount(){
        const formdata = this.state.formdata;

        this.props.dispatch(getBrands()).then( response => {
            //add data to the state
            //add the data from redux regarding id and name to the item to the brand options, look in state for the options array in the brand object
            const newFormData = populateOptionFields(formdata, this.props.products.brands, 'brand');

            //update the fields
            this.updateFields(newFormData);
        });

        this.props.dispatch(getWoods()).then( response => {
            const newFormData = populateOptionFields(formdata, this.props.products.woods, 'wood');
            this.updateFields(newFormData);
        });

    }

    render() {
        return (
           <UserLayout>
                <div>
                    <h1>Add product</h1>
                        <form onSubmit={(event)=> this.submitForm(event)}>
                            <FormField id = {'name'} formData = { this.state.formdata.name} change = { (element => this.updateForm(element)) } 
                            />
                            <FormField id = {'description'} formData = { this.state.formdata.description} change = { (element => this.updateForm(element)) } 
                            />
                            <FormField id = {'price'} formData = { this.state.formdata.price} change = { (element => this.updateForm(element)) } 
                            />
                        <div className="form_divider">  </div>
                            <FormField id = {'brand'} formData = { this.state.formdata.brand} change = { (element => this.updateForm(element)) } 
                            />
                            <FormField id = {'shipping'} formData = { this.state.formdata.shipping} change = { (element => this.updateForm(element)) } 
                            />
                            <FormField id = {'available'} formData = { this.state.formdata.available} change = { (element => this.updateForm(element)) } 
                            />
                        <div className="form_divider">  </div>
                            <FormField id = {'wood'} formData = { this.state.formdata.wood} change = { (element => this.updateForm(element)) } 
                            />
                            <FormField id = {'frets'} formData = { this.state.formdata.frets} change = { (element => this.updateForm(element)) } 
                            />
                        <div className="form_divider">  </div>
                            <FormField id = {'publish'} formData = { this.state.formdata.publish} change = { (element => this.updateForm(element)) } 
                            />
                            {this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                                </div>
                            :null
                            }

                            {this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                </div>    
                            : null}
                            <button onClick = {(event) => this.submitForm(event)}>Add Product</button>
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