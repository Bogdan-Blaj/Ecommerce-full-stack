import React from 'react';
import moment from 'moment/moment.js'; 
// moment is used to display date

// <td>{product.dateOfPurchase}</td>
// <td>{product.brand} {product.name}</td>
// <td>$ {product.price}</td>
// <td>{product.quantity}</td>

const UserHistoryBlock = (props) => {


    const renderBlocks = () => (
        props.products ?
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
                    <td>{product.name} {product.brand.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
        :null
    )
    console.log("inside History Block");
    console.log();

    if(props.products !== null)
          {  
              props.products.map((product,i)=>(
                console.log(i),
                console.log("product: " + product),
                console.log("quantity: " + product.quantity),
                console.log("name: " + product.name),
                console.log("brand: " + product.brand.name),
                console.log("date: " + product.dateOfPurchase)
            ))
        }
    return (
        
        <div className="history_blocks">

            <table>
                <thead>
                    <tr>
                        <th>Date of Purchase</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderBlocks()
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserHistoryBlock;