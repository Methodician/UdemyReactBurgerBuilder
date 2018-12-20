import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    }

    addIngredientHandler = (type) => {
        const ingredients = { ...this.state.ingredients };
        ingredients[type] = ingredients[type] + 1;
        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        
        this.setState({ingredients, totalPrice});

    }

    removeIngredientHandler = (type) => {
        const ingredients = { ...this.state.ingredients };
        // I like his approach better.
        if(ingredients[type] <= 0) return;
    // if(ingredients[type] > 0){
        ingredients[type] = ingredients[type] - 1;
        const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients, totalPrice});
    // }
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        return(
            <Fragment>
                <p>cost: {this.state.totalPrice}</p>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}></BuildControls>
            </Fragment>
        );
    }
}

export default BurgerBuilder;
