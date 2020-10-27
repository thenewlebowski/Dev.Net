import React from 'react'
import classes from './Desc2.module.css';

export default function Desc2() {
    return (
        <div className={classes.descContainer}>
            <div className={classes.descInnerContainer}>
                <h1 className={classes.descHeader}>Support the cause</h1>
                <p className={classes.descDesc}>We don’t agree with the idea of paying for education or entertainment. We do still need to pay for our team to collaborate and research to get you the best information you can get. So instead of supporting us directly
from a patrion account or a donations. Please consider buying some of
our merch. You’ll look good and you will be helping advertise what we do!
  </p>
                <span><button className={"btn btnPrimary " + classes.descBtn}>Join Now</button></span>
            </div>
        </div>
    )
}
