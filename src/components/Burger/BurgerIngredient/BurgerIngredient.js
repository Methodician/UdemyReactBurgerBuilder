import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

// PropTypes doesn't work on functional components so we make it a class, but still leave it a dumb component so it doesn't mean much.
// const burgerIngredient = (props) => {
class BurgerIngredient extends Component {

    // constructor(props) {
    //     super(props);
    //     this.props = props;
    // }

    render() {
        let ingredient = null;
        
        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                    break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('salad'):
                    ingredient = <div className={classes.Salad}></div>;
                    break;
            case ('bacon'):
                    ingredient = <div className={classes.Bacon}></div>;
                    break;
            default:
                break;
        }
        
        return ingredient;
    }
    
    
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;