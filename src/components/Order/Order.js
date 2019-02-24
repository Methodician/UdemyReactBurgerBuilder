import React from 'react';

import classes from './Order.css';

// He made it return stuff wrapped in curley braces and made helper functions for mapping, but I wanted to exercise in-line ninja stuff
const order = props => (
  <div className={classes.Order}>
    <p>
      Ingredients:
      {Object.entries(props.ingredients).map(ingredient => (
        <span
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px',
          }}
          key={ingredient[0]}
        >{`${ingredient[0]}: ${ingredient[1]}`}</span>
      ))}
    </p>
    <p>
      Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
  </div>
);

export default order;
