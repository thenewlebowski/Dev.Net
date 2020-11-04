import React, { useEffect } from 'react'
import classes from './Desc.module.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Desc(props) {
    
    useEffect(() => {

    }, [])

    return (
        <div className={classes.descContainer} style={{ zIndex: props.zIndex }}>
            <div className={classes.descInnerContainer}  style={{ textAlign: props.textAlign }} >
                <h1 className={classes.descHeader}>{props.header}  <FontAwesomeIcon icon={props.iconHeader}/></h1>
                <p className={classes.descDesc}>{props.body}</p>
                
                { props.href ? 
                    <span>
                        <Link to={props.href} className={"btn btnPrimary " + classes.descBtn}>
                            {props.btnText}  <FontAwesomeIcon icon={props.iconBtn} />
                        </Link>
                    </span> 
                : null }

            </div>
        </div>
    )
}
