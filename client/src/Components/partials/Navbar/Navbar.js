import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import classes from './navbar.module.css';

export default function Navbar() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className={classes.navbar}>
            <div className="container">
                <div className={classes.navbarContainer}>
                    <div className={classes.navHeader}>
                        <Link to="/" >Dev.Net</Link>
                    </div>
                    <div className={classes.navItems}>
                        {auth.isAuthenticated ? <Link to="#" onClick={()=>dispatch(logoutUser())}>Logout</Link> : null}
                        {!auth.isAuthenticated ? <Link to="/login" >Login</Link> : null}
                        {!auth.isAuthenticated ? <Link to="/signup" >Sign Up</Link> : null}
                    </div>
                </div>
            </div>
        </nav>
    )
}
