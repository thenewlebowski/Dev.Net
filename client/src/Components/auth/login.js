import React, { useState } from 'react';
import classes from './auth.module.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={ classes.container }>
            <form className={ classes.form }>
                <h1>Login</h1>
                <div className={ classes.formGroup}>
                    <label for="username">Enter username:</label>
                    <input
                        className={ classes.formInput }
                        type="text"
                        name="username"
                        value={ username }
                        placeholder="username"
                        onChange={ (e) => setUsername( e.target.value )}
                    />
                </div>
                <div className={ classes.formGroup}>
                    <label for="password">Enter password:</label>
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
