import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
   state = {
      name: '',
      email: '',
      addres: {
         street: '',
         zip: '',
      },
      loading: false,
   }

   orderHandler = async(e) => {
      // default action for a button in a form is to reload with new route query params - kind of cool actually...
      e.preventDefault();
      // console.log(this.props.ingredients);
      this.setState({ loading: true })
      // const { name, email, address } = this.state;
        try {
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totalPrice, // naturally we'd re-calc the price on the server IRL
                customer: {
                  name: 'Jacob Johnston',
                  address: {
                      street: 'Hood',
                      zipCode: '23424',
                      country: 'Afrika'
                  },
                  email: 'test@test.com'
              },
              deliveryMethod: 'fastest'
            };
            const res = await axios.post('/orders.json', order);
            if(res && res.status === 200) {
               this.props.history.push('/');
            }
        } catch (error) {
            alert(JSON.stringify(error));
        } finally {
            // this.setState({ loading: false, purchasing: false });
            // No longer using purchasing state.
            this.setState({ loading: false });
        }
   }

   render () {
      console.log('form props', this.props);

      let form = this.state.loading
         ? (<Spinner />)
         : (<div className={classes.ContactData}>
               <h4>Enter your Contact Info</h4>
               <form>
                  <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                  <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                  <input className={classes.Input} type="text" name="street" placeholder="Street address" />
                  <input className={classes.Input} type="text" name="zip" placeholder="Zip code" />
                  <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
               </form>
            </div>);
      return form;
   }
}

export default ContactData;