import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={classes.navbar}>
            <div className={classes.navHeader}>
                <Link>Dev.Net</Link>
            </div>
            <div className={classes.navItems}>
                
            </div>
        </nav>
    )
}
