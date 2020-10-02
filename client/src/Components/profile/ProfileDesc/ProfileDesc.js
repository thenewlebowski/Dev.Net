import React from 'react';
import classes from './ProfileDesc.module.css';

export default function ProfileDesc(props) {
    return (
        <div className={classes.profileDesc}>
            <div className={classes.descHeader}>
                <h1 className={classes.username}>
                        {props.username}
                </h1>
                <div className={ classes.btnContainer }>
                    <button onClick={props.editToggle} className={'btn btnWarning'}>
                        {props.editMode ? "Cancel" : "Edit"}
                    </button>
                </div>
                
            </div>
            
            <div className={ classes.infoContainer }>
                <div className={ classes.bioContainer }>
                    <h5>Bio</h5> 
                    <p>{props.bio} </p>
                </div>
                <div className={ classes.langsContainer }>
                    <h5>Fluent languages:</h5>
                    <ul>
                        {props.langs.length > 0 ? props.languages(props.langs) : <em>No languages yet</em>}
                    </ul>
                </div>
            </div>
        </div>
    )
}
