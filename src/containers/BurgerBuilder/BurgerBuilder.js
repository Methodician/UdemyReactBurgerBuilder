import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BurgerBuilder.css';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    // He refers to omitting this as "more modern"
    // constructor(props){
    //     super(props);
    //     this.props = props;
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
    }

    continueCheckoutHandler = async () => {
        // alert('continued purchase');
        this.setState({ loading: true })
        try {
            const order = {
                ingredients: this.state.ingredients,
                price: this.state.totalPrice, // naturally we'd re-calc the price on the server IRL
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
            const res = await axios.post('fsadf', order);
            console.log(res);
        } catch (error) {
            alert(JSON.stringify(error));
        } finally {
            this.setState({ loading: false, purchasing: false });
        }

    }

    cancelCheckoutHandler = () => {
        this.setState({ purchasing: false });
    }

    checkoutHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseable = (ingredients) => {
        // State ingredients wasn't updated in time.
        // const ingredients = { ...this.state.ingredients }; didn't work.
        // So, we just pass ingredients in directly from the function that is updating them and the state itself.
        const sum = Object.values(ingredients)
            .reduce((total, next) => {
                // console.log({ total, next });
                return total + next;
            }, 0);
        const purchaseable = sum > 0;
        this.setState({ purchaseable });
    }

    addIngredientHandler = (type) => {
        const ingredients = { ...this.state.ingredients };
        ingredients[type] = this.state.ingredients[type] + 1;
        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients, totalPrice });
        this.updatePurchaseable(ingredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) return;
        const ingredients = { ...this.state.ingredients };
        ingredients[type] = this.state.ingredients[type] - 1;
        const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients, totalPrice });
        this.updatePurchaseable(ingredients);
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let summary =
            <OrderSummary
                ingredients={this.state.ingredients}
                cancelClicked={this.cancelCheckoutHandler}
                continueClicked={this.continueCheckoutHandler}
                price={this.state.totalPrice} />;


        if (this.state.loading) {
            summary = <Spinner />
        }

        return (
            <Fragment>
                <Modal modalClosed={this.cancelCheckoutHandler} show={this.state.purchasing} >
                    {summary}
                </Modal>
                <div className={classes.BurgerContainer}>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        price={this.state.totalPrice}
                        onCheckout={this.checkoutHandler} />
                </div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;
