import React, { Fragment, Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // We were only checking. This could still be a functional component.
    componentWillUpdate() {
        console.log('[Order Summary] WillUpdate')
    }

    render() {
        const ingredientSummary = Object
            .entries(this.props.ingredients)
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
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelClicked}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continueClicked}>CONTINUE</Button>
            </Fragment>
        );
    }
};

export default OrderSummary;
// Functional Component version:
// const orderSummary = (props) => {
//     const ingredientSummary = Object
//         .entries(props.ingredients)
//         .map(ingredient => {
//             return (
//                 <li key={ingredient[0]}>
//                     <span style={{ textTransform: 'capitalize' }}>{ingredient[0]}</span>: {ingredient[1]}
//                 </li>
//             );
//         });

//     return (
//         <Fragment>
//             <h3>Your Order</h3>
//             <p>A delicious burger with the following stuff:</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
//             <p>Continue to Checkout?</p>
//             <Button btnType="Danger" clicked={props.cancelClicked}>CANCEL</Button>
//             <Button btnType="Success" clicked={props.continueClicked}>CONTINUE</Button>
//         </Fragment>
//     );
// };

// export default orderSummary;