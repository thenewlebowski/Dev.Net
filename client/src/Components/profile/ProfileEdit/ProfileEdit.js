import React, {useEffect} from 'react';
import classes from './ProfileEdit.module.css';

export default function ProfileEdit(props) {

    let onSubmit = (e) =>{
        e.preventDefault();
        e.stopPropagation();

        console.log(e);
    }

    let btnClasses = [classes.btn]
    return (
        <form className={classes.profileDesc} onSubmit={(e) => onSubmit(e)}>
            <div className={ classes.descHeader }>
                <input
                onChange={ (e) => props.handleChange(e) }
                className={ classes.username }
                value={ props.editData.username }
                name='username'
                type='text'/>
                <div className="btnContainer">
                    <input className={'btn btnSuccess'} type='submit' value='Submit'/> 
                    <button className={'btn btnDanger'} onClick={props.editToggle}>
                        {props.editMode ? "Cancel" : "Edit"}
                    </button>
                </div>
            </div>
            

            <div className={ classes.infoContainer }>

                <div className={ classes.bioContainer }>
                    <h5>Bio</h5>
                    <textarea
                    onChange={ (e) => props.handleChange(e) }
                    className={classes.bioTextArea}
                    value={props.editData.bio}
                    name='bio'/>
                </div>

                <div className={ classes.langsContainer }>
                    <h5>Fluent languages:</h5>
                    <ul>
                        {props.languages(props.editData.langs)}
                    </ul>
                </div>
            </div>

        </form>
    )
}
