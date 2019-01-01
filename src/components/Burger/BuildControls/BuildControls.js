import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]}
                removed={() => props.ingredientRemoved(ctrl.type)}
                added={() => props.ingredientAdded(ctrl.type)} />
            // added={props.ingredientAdded} type={ctrl.type} /> (just showing the diff. We can use arrow function to pass args instead of passing type back and fourth)
        ))}
        <button
            disabled={!props.purchaseable}
            className={classes.OrderButton}
            onClick={props.onCheckout}>
            Check Out
        </button>
    </div>

    // My best guess...
    // const buildControls = controls.map((control, ) => {
    //     return <BuildControl label={control.label} />
    // });
    // return <div className={classes.buildControls}>
    //     {buildControls}
    // </div>
);

export default buildControls;