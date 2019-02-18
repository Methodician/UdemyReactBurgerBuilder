import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/ingredients.json');
            const ingredients = res.data;
            this.setState({ ingredients });
        } catch (error) {
            this.setState({ error: true });
        }
    }

    continueCheckoutHandler = async () => {
        
        const queryParams = [];
        const { ingredients } = this.state;
        for(let i in ingredients) {
            const uriComponent = (`${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`);
            queryParams.push(uriComponent);
        }
        queryParams.push(`${encodeURIComponent('totalPrice')}=${this.state.totalPrice}`);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
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

        let summary = null;

        let burgerBilder = this.state.error ? <p>The ingedients couldn't be loaded so the app is broke :-(</p> : <Spinner />;

        if (this.state.ingredients) {
            burgerBilder = (
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
            );
            summary =
                <OrderSummary
                    ingredients={this.state.ingredients}
                    cancelClicked={this.cancelCheckoutHandler}
                    continueClicked={this.continueCheckoutHandler}
                    price={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            summary = <Spinner />
        }

        return (
            <Fragment>
                <Modal modalClosed={this.cancelCheckoutHandler} show={this.state.purchasing} >
                    {summary}
                </Modal>
                {burgerBilder}
            </Fragment>
        );
    }
}

// Pretty interesting so we can wrap the export in the HOC...
export default withErrorHandler(BurgerBuilder, axios);
