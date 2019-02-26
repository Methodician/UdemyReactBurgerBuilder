import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  newInputElement = (
    elementType,
    configType,
    configPlaceholder,
    value,
    validation,
  ) => {
    return {
      elementType,
      elementConfig: {
        // important that these config options use default element names - see inside Input.js
        type: configType,
        placeholder: configPlaceholder,
      },
      value,
      validation,
      edited: false,
      // valid: false,
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
        validation: { required: true },
        edited: false,
        //   valid: false,
      },
      street: this.newInputElement('input', 'text', 'Street Name', '', {
        required: true,
        minLength: 5,
      }),
      zipCode: this.newInputElement('input', 'text', 'Zip Code', '', {
        required: true,
        minLength: 5,
        maxLength: 5,
      }),
      country: this.newInputElement('input', 'text', 'Country', '', {
        required: true,
      }),
      email: this.newInputElement('input', 'email', 'Your E-Mail', '', {
        required: true,
      }),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
      },
    },
    loading: false,
  };

  orderHandler = async e => {
    // default action for a button in a form is to reload with new route query params - kind of cool actually...
    // Even when using onSubmit we want to prevent default so we don't send a request and reload the page.
    e.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });
    // const { name, email, address } = this.state;
    const { orderForm } = this.state;
    const orderData = {};
    for (let key in orderForm) {
      orderData[key] = orderForm[key].value;
    }

    try {
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice, // naturally we'd re-calc the price on the server IRL
        orderData,
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

  checkValidity = (value, rules) => {
    if (!rules) return true;
    let isValid = true;
    // When we defaulted isValid to false and set it to true, it would always be true if the last one was true
    // By defaulting to false and appending && isValid, any subsequent rule after it's falsified will return false. This way all of them have to return true in sequence.

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  handleInputChange = (event, inputKey) => {
    const { value } = event.target;
    // not a deep clone because the nested objects are still references
    const { orderForm } = { ...this.state };
    // Clones the actual form element
    const elem = { ...orderForm[inputKey] };
    elem.value = value;
    elem.edited = true;
    // He did it here but I found it didn't check for default values, so I opted to call the function right on the element prop definition...
    //  const { validation } = elem;
    //  elem.valid = this.checkValidity(value, validation);
    // I wanted something like Angulars .touched so I added it insetad.

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
        valid={this.checkValidity(
          orderForm[key].value,
          orderForm[key].validation,
        )}
        edited={orderForm[key].edited}
        handleChange={event => this.handleInputChange(event, key)}
      />
    ));
    // For some reason he made formElementsArray with for let key in and then just pushed { id: key, config: this.state.orderForm[key] }
    // Then he mapped through that array in the return body below...

    let form = this.state.loading ? (
      <Spinner />
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Info</h4>
        <form onSubmit={this.orderHandler}>
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
