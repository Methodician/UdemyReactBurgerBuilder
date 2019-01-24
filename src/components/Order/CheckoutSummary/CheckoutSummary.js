import React from 'react';

import Burger from '../../Burger/Burger'; 
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {


   return (
      <div className={classes.CheckoutSummary}>
         <h1>We hope it's tasty!</h1>
         <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients} />
            <Button
               btnType="Danger"
               clicked={props.cancelClicked}>Cancel</Button>
            <Button 
               btnType="Success"
               clicked={props.continueClicked}>Continue</Button>
         </div>
      </div>
   );
}

export default checkoutSummary;