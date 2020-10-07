import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import classes from './Auth.module.css';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector( state => state.auth);
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(auth.isAuthenticated){
            props.history.push('/');
        }
    }, [])


    function onSubmit(e){
        e.preventDefault();

        let data = {
            email,
            password
        }
        
        dispatch(loginUser(data, props.history))
    }

    return (
        <div className={ classes.container }>
            <form className={ classes.form } onSubmit={(e)=> onSubmit(e)}>
                <h1>Login</h1>
                <div className={ classes.formGroup}>
                    <label htmlFor="email">Enter email:</label>
                    <span>{errors.email}{errors.emailNotFound}</span>
                    <input
                        className={ classes.formInput }
                        type="email"
                        name="email"
                        value={ email }
                        placeholder="email"
                        onChange={ (e) => setEmail( e.target.value )}
                    />
                </div>
                <div className={ classes.formGroup}>
                    <label htmlFor="password">Enter password:</label>
                    <span>{errors.password}{errors.passwordIncorrect}</span>
                    <input
                        className={ classes.formInput }
                        type="password"
                        name="password"
                        placeholder="password"
                        value={ password }
                        onChange={ (e) => setPassword( e.target.value )}
                    />
                </div>

                <div className={ classes.formGroup }>
                    <input 
                        className={ classes.formBtn}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login);
