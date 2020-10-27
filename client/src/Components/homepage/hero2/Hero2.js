import React from 'react';
import pic from './hero2Pic.jpg';
import classes from './Hero2.module.css';
export default function Hero2() {
    return (
        <div className={classes.hero2Conatiner}>
            <img src={pic} className={classes.hero2Img}/>
        </div>
    )
}
