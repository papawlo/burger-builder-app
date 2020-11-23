import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav className={classes.desktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}


export default toolbar
