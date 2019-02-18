import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

   // summary of checkout (what and cost)
   // cancel
   // continue
   // show the burger and ingredient list

   state = {
      ingredients: null,
      price: 0,
   }

   // componentDidMount() {
   // No need for componentDidUpdate since this will always mount when it loads and there is no way to route to it.
   // DidMount stopped working when we initialized ingredients to null in state but WillMount already has access to query and does work.
   componentWillMount() {
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      for(let param of query.entries()){
         // looks like: ['salad', '1']
         if(param[0] === 'totalPrice') continue;
         ingredients[param[0]] = +param[1];
      }
      const totalPrice = +query.get('totalPrice');
      this.setState({ingredients, totalPrice});
   }

   checkoutContinueHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   }

   checkoutCancelHandler = () => {
      this.props.history.goBack();
   }

   render() {
      console.log(this.state);
      const { totalPrice, ingredients } = this.state;
      return (
         <div>
            <CheckoutSummary
               ingredients={this.state.ingredients}
               continueClicked={this.checkoutContinueHandler}
               cancelClicked={this.checkoutCancelHandler} />
            <Route
               path={`${this.props.match.path}/contact-data`}
               render={(props) => (<ContactData ingredients={ingredients} totalPrice={totalPrice} {...props} />)}/>
               {/* We decided to pass props down instead of wrapping ContactData with the withRouter from react-dom-router */}
               {/* render={() => (<ContactData ingredients={ingredients} totalPrice={totalPrice} />)}/> */}
            {/* We will use the render method in the route instead so we can pass in the ingredients as props */}
            {/* <Route path={`${this.props.match.path}/contact-data`} component={ContactData} /> */}
         </div>
      );
   }

}

export default Checkout;