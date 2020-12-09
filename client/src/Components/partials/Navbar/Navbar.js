import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import classes from './Navbar.module.css';

//======FONT AWESOME ICONS=======//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const profilePath = auth.isAuthenticated ? "/p/" + auth.user.username : "/login";

    useEffect(() => {
        return () => {
            
        }
    }, [])

    return (
        <nav className={classes.navbar}>
            <div className="container">
                <div className={classes.navbarContainer}>
                    <div className={classes.navHeader}>
                        <Link to="/" >Dev.Net</Link>
                    </div>
                    <div className={classes.navItems}>
                        {!auth.isAuthenticated ? <Link to="/login" >Login</Link> : <Link to={ profilePath } >Profile</Link>}
                        {!auth.isAuthenticated ? <Link to="/signup" >Sign Up</Link> : <Link to="/node">Node</Link>}
                        {auth.isAuthenticated ? <Link to="#" onClick={()=>dispatch(logoutUser())}>Logout</Link> : null}
                        {auth.isAuthenticated ? <Link to="/msg"> <FontAwesomeIcon icon={faEnvelope} /> </Link> : null}
                        {auth.isAuthenticated ? <Link to="/settings"> <FontAwesomeIcon icon={faCog} /> </Link> : null}
                    </div>
                </div>
            </div>
        </nav>
    )
}
