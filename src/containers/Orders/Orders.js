import React, { Component } from 'react';

import Order from './../../components/Order/Order';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    // Using didMount instead of didUpdate because it should never be re-rendering without a mount action.
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      const res = await axios.get('/orders.json');
      const orders = Object.entries(res.data).map(entry => {
        return {
          id: entry[0],
          ...entry[1],
        };
      });
      console.log(orders);
      this.setState({ orders });
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { orders, loading } = this.state;
    const list = loading ? (
      <Spinner />
    ) : (
      orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    );
    return (
      <div>
        {list}
        {/* <Order />
        <Order /> */}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
