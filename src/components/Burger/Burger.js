import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log('burger props', props);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        }).reduce((prevVal, currentVal) => {
            return prevVal.concat(currentVal);
        }, []);
        
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding stuff</p>
        }


        return (
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        );
        

    // return (
    //     <div className={classes.Burger}>
    //         <BurgerIngredient type="bread-top"/>
    //         <BurgerIngredient type="cheese"/>
    //         <BurgerIngredient type="meat"/>
    //         <BurgerIngredient type="bread-bottom"/>
    //     </div>
    // );
};

export default withRouter(burger);