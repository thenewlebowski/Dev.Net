import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from './auth.module.css';

function Signup(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    const errors = useSelector(state => state.errors);

    const dispatch = useDispatch()

    useEffect(()=>{
        // setError({...errors})
        // console.log(errors)
    }, )
    
    function onSubmit(e){
        e.preventDefault();
        let data = {
            firstName,
            lastName,
            username,
            password,
            password2,
            email
        }
        dispatch(registerUser(data, props.history))
    }        

    return (
        <div className={ classes.container }>
            
            <form className={ classes.form } onSubmit={ (e)=> onSubmit(e) }>

                <h1>Sign Up</h1>
                <p>Join developers, just like you, that are looking to join the force and network </p>
                <p>Learn from some of our brightest minds. Maybe teach a few courses of your own</p> 


                <div className={ classes.formRow}>

                    <div className={ classes.formGroup }>
                        <label htmlFor="firstName">Enter first name:</label>
                        <span>{errors.firstName}</span>
                        <input
                            className={ classes.formInput }
                            type="text"
                            value={firstName}
                            name="firstName"
                            placeholder="first name"
                            onChange={(e) => setFirstName( e.target.value )}/>
                    </div>

                    <div className={ classes.formGroup }>
                        <label htmlFor="lastName">Enter last name:</label>
                        <span>{errors.lastName}</span>
                        <input
                            className={ classes.formInput }
                            name="lastName"
                            type="text"
                            value={lastName}
                            placeholder="last name"
                            onChange={(e) => setLastName( e.target.value )}/>
                    </div>

                </div>
                
                <div className={ classes.formRow}>

                    <div className={ classes.formGroup }>
                        <label htmlFor="username">Enter an unique username:</label>
                        <span>{errors.username}</span>
                        <input
                            className={ classes.formInput }
                            name="username"
                            value={ username }
                            type="text" 
                            placeholder="username"
                            onChange={ (e) => setUsername( e.target.value )}/>
                    </div>

                    <div className={ classes.formGroup }>
                        <label htmlFor="email">Enter an unique email:</label>
                        <span>{errors.email}{errors.emailExists}</span>
                        <input
                            className={ classes.formInput }
                            name="email"
                            value={ email }
                            type="email" 
                            placeholder="email"
                            onChange={ (e) => setEmail( e.target.value )}/>
                    </div>

                </div>

                <div className={ classes.formGroup }>
                    <label htmlFor="password">Enter a unique password:</label>
                    <span>{errors.password}</span>
                    <input
                        className={ classes.formInput }
                        name="password"
                        type="password" 
                        placeholder="password"
                        value={ password }
                        onChange={ (e) => setPassword( e.target.value )}/>
                </div>

                <div className={ classes.formGroup }>
                    <label htmlFor="password2">Confirm password:</label>
                    <span>{errors.password2}</span>

                    <input
                        className={ classes.formInput }
                        name='password2'
                        type="password" 
                        placeholder="password2 password"
                        value={ password2 }
                        onChange={ (e) => setPassword2( e.target.value )}
                        />
                </div>

                <div className={ classes.formGroup }>
                    <input 
                        className={ classes.formBtn }
                        type="submit"
                    />
                </div>
                
            </form>
        </div>
    )
}

export default withRouter(Signup);