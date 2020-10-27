import React from 'react'
import classes from './Desc.module.css';

export default function Desc() {
    return (
        <div className={classes.descContainer}>
            <div className={classes.descInnerContainer}>
                <h1 className={classes.descHeader}>Connect. Build. Succeed.</h1>
                <p className={classes.descDesc}>Software development careers are estimated to grow 50 percent by the year 2025. Our goal is to educate future developers of up and coming technologies. In our efforts we hope to establish an ecosystem of thriving developers that continue to grow and keep our ideologies strong by educating their own peers. If you are interested in joining the Dev Army click the link below. </p>
                <span><button className={"btn btnPrimary " + classes.descBtn}>Join Now</button></span>
            </div>
        </div>
    )
}
