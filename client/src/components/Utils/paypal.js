import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {
        const onSuccess = (payment) => {
            console.log('transaction success');
            console.log(payment);
            this.props.onSuccess(payment);
        }

        const onCancel = (data) => {
            console.log(data);
        }

        const onError = (error) => {
            console.log(error);
        }

        let env = 'sandbox';

        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
        let currency = 'USD';

        // let total = this.props.toPay;
        //for testing
        let total = 5;

        const client = {
            sandbox : 'AflV3rcXu9rsBGhV70vN_Fco3aYa5pNILCOl1NkVNkVf-OpkJzvNco6miKK9Je-9Dr_TqsoyuZV5zp0w',
            production : ''
        }

        // address:
        //     city: "San Jose"
        //     country_code: "US"
        //     line1: "1 Main St"
        //     postal_code: "95131"
        //     recipient_name: "John Doe"
        //     state: "CA"
        // cancelled: false
        // email: "buyertestingaccount@personal.example.com"
        // paid: true
        // payerID: "A9G5693TKQU8A"
        // paymentID: "PAYID-L5PWILA4Y987776857656624"
        // paymentToken: "EC-52618013FL086752X"
        // returnUrl: "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L5PWILA4Y987776857656624&token=EC-52618013FL086752X&PayerID=A9G5693TKQU8A"

        return (
            <div>
                 <PaypalExpressBtn 
                    env = {env}
                    client = {client}
                    currency = {currency}
                    total = {total}
                    onError = {onError}
                    onSuccess = {onSuccess}
                    onCancel = {onCancel}
                    style = {{
                        size : 'large',
                        color : 'blue',
                        shape : 'rect',
                        label : 'checkout'
                    }}
                 />
            </div>
        )
    }
}

export default Paypal;