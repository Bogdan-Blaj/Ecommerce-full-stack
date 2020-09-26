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