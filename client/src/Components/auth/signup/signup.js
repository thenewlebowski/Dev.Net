import React, { useState } from 'react'
import classes from './signup.module.css'

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');

    
    function onSubmit(e){
        e.preventDefault();
        let data = {
            firstName,
            lastName,
            username,
            password,
            confirm,
            email
        }
        console.log(data);
    }        

    return (
        <div className={ classes.container}>
            
            <form className={ classes.form } onSubmit={ (e)=> onSubmit(e) }>

                <h1>Sign Up</h1>
                <p>Join developers, just like you, that are looking to join the force and network </p>
                <p>Learn from some of our brightest minds. Maybe teach a few courses of your own</p> 


                <div className={ classes.formRow}>

                    <div className={ classes.formGroup }>
                        <label for="firstName">Enter first name:</label>
                        <input
                            className={ classes.formInput }
                            type="text"
                            value={firstName}
                            name="firstName"
                            placeholder="first name"
                            onChange={(e) => setFirstName( e.target.value )}/>
                    </div>

                    <div className={ classes.formGroup }>
                        <label for="lastName">Enter last name:</label>
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
                        <label for="username">Enter a unique username:</label>
                        <input
                            className={ classes.formInput }
                            name="username"
                            value={ username }
                            type="text" 
                            placeholder="username"
                            onChange={ (e) => setUsername( e.target.value )}/>
                    </div>

                    <div className={ classes.formGroup }>
                        <label for="email">Enter a unique email:</label>
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
                    <label for="password">Enter a unique password:</label>
                    <input
                        className={ classes.formInput }
                        name="password"
                        type="text" 
                        placeholder="password"
                        value={ password }
                        onChange={ (e) => setPassword( e.target.value )}/>
                </div>

                <div className={ classes.formGroup }>
                    <label for="confirm">Confirm password:</label>
                    <input
                        className={ classes.formInput }
                        name='confirm'
                        type="text" 
                        placeholder="confirm password"
                        value={ confirm }
                        onChange={ (e) => setConfirm( e.target.value )}
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
