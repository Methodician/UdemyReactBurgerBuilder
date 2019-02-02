import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

   // summary of checkout (what and cost)
   // cancel
   // continue
   // show the burger and ingredient list

   state = {
      ingredients: {
         salad: 1,
         meat:1,
         cheese: 1,
         bacon: 1,
      }
   }

   componentDidMount() {
      // No need for componentDidUpdate since this will always mount when it loads and there is no way to route to it.
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      for(let param of query.entries()){
         // looks like: ['salad', '1']
         ingredients[param[0]] = +param[1];
      }
      this.setState({ingredients});
   }

   checkoutContinueHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   }

   checkoutCancelHandler = () => {
      this.props.history.goBack();
   }

   render() {
      return (
         <div>
            <CheckoutSummary
               ingredients={this.state.ingredients}
               continueClicked={this.checkoutContinueHandler}
               cancelClicked={this.checkoutCancelHandler} />
         </div>
      );
   }

}

export default Checkout;