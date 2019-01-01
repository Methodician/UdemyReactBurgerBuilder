import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object
        .entries(props.ingredients)
        .map(ingredient => {
            return (
                <li key={ingredient[0]}>
                    <span style={{ textTransform: 'capitalize' }}>{ingredient[0]}</span>: {ingredient[1]}
                </li>
            );
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following stuff:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelClicked}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueClicked}>CONTINUE</Button>
        </Fragment>
    );
};

export default orderSummary;