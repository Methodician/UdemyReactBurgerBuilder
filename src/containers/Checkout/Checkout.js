import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

   // summary of checkout (what and cost)
   // cancel
   // continue
   // show the burger and ingredient list

   state = {
      ingredients: {
         salad: 3,
         meat:1,
         cheese: 1,
         bacon: 1,
      }
   }

   continueCheckoutHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   }

   cancelCheckoutHandler = () => {
      this.props.history.goBack();
   }

   render() {
      console.log(this.props);
      return (
         <div>
            <CheckoutSummary
               ingredients={this.state.ingredients}
               continueClicked={this.continueCheckoutHandler}
               cancelClicked={this.cancelCheckoutHandler} />
         </div>
      );
   }

}

export default Checkout;