import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './logo.css'
const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    )
}

export default logo
