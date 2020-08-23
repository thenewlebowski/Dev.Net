import React from 'react';
import {Link} from 'react-router-dom';
import classes from './navbar.module.css';

export default function Navbar() {
    return (
        <nav className={classes.navbar}>
            <div className={classes.navHeader}>
                <Link to="/" >Dev.Net</Link>
            </div>
            <div className={classes.navItems}>
                <Link to="/login" >Login</Link>
                <Link to="/signup" >Sign Up</Link>
            </div>
        </nav>
    )
}
