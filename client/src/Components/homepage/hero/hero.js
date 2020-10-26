import React from 'react';
import classes from './Hero.module.css';
import heroPic from './hero_pic.jpg';

export default function Hero() {
    return (
        <div className={classes.hero} style={{overflow: 'hidden'}}>
            <img className={classes.heroImg} src={heroPic} style={{width: '100%', top: '-75%', position: 'relative'}}/>
        </div>
    )
}
