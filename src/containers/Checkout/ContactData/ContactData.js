import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  newInputElement = (elementType, configType, configPlaceholder, value) => {
    return {
      elementType,
      elementConfig: {
        // important that these config options use default element names - see inside Input.js
        type: configType,
        placeholder: configPlaceholder,
      },
      value,
    };
  };

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: 'Jacob Johnston',
      },
      street: this.newInputElement('input', 'text', 'Street Name', ''),
      zipCode: this.newInputElement('input', 'text', 'Zip Code', ''),
      country: this.newInputElement('input', 'text', 'Country', ''),
      email: this.newInputElement('input', 'email', 'Your E-Mail', ''),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
    },
    loading: false,
  };

  orderHandler = async e => {
    // default action for a button in a form is to reload with new route query params - kind of cool actually...
    e.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });
    // const { name, email, address } = this.state;
    try {
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice, // naturally we'd re-calc the price on the server IRL
      };
      const res = await axios.post('/orders.json', order);
      if (res && res.status === 200) {
        this.props.history.push('/');
      }
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      // this.setState({ loading: false, purchasing: false });
      // No longer using purchasing state.
      this.setState({ loading: false });
    }
  };

  handleInputChange = (event, inputKey) => {
    const { value } = event.target;
    // not a deep clone because the nested objects are still references
    const { orderForm } = { ...this.state };
    // Clones the actual form element
    const elem = { ...orderForm[inputKey] };
    elem.value = value;
    orderForm[inputKey] = elem;
    this.setState({ orderForm });
  };

  render() {
    const { orderForm } = this.state;
    const orderFormKeys = Object.keys(orderForm);
    const formElementsArray = orderFormKeys.map(key => (
      <Input
        key={key}
        elementType={orderForm[key].elementType}
        elementConfig={orderForm[key].elementConfig}
        value={orderForm[key].value}
        changed={event => this.handleInputChange(event, key)}
      />
    ));
    // For some reason he made formElementsArray with for let key in and then just pushed { id: key, config: this.state.orderForm[key] }
    // Then he mapped through that array in the return body below...

    let form = this.state.loading ? (
      <Spinner />
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Info</h4>
        <form>
          {/* <Input
            inputtype="input"
            type="text"
            name="name"
            placeholder="Your name"
          /> */}
          {/* <Input elementType="..." elementConfig="..." value="..." /> */}
          {formElementsArray}

          <Button clicked={this.orderHandler} btnType="Success">
            ORDER
          </Button>
        </form>
      </div>
    );
    return form;
  }
}

export default ContactData;
