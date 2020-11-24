import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.DrawerToggleClicked}>

            </DrawerToggle>
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
