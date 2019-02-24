import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    {/* So we can only have the first link with exact (so active class works right) we pass it here instead of puting it on all in the NavicationItem component */}
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItems;
