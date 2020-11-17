import React, { useEffect }    from 'react';
import isEmpty  from 'is-empty';
import classes  from './ProfileDesc.module.css';


export default function ProfileDesc(props) {
    //Checks to see if user is authenticated and if user viewing profile is profile owner
    let profileOwner = (props.auth.isAuthenticated && props.auth.user.id === props.userId) ? true : false;

    useEffect(() => {
        console.log(props.langs);
        return () => {
            
        }
    }, [])

    let langs = () => {
        return props.langs.map( lang => (
            <li>{lang}</li>
        ))
    }

    return (
        <div className={classes.profileDesc}>
            <div className={classes.descHeader}>
                <h1 className={classes.username}>{props.username}</h1>
                
                <div className={ classes.btnContainer }>
                    {/* Checks to see if profile owner is set to true and if so show a button or else null*/}
                    {profileOwner ? 
                        <button onClick={props.editToggle} className={'btn btnWarning'}>
                            {props.editMode ? "Cancel" : "Edit"}
                        </button>
                    : null}
                </div>
                
            </div>
            
            <div className={ classes.infoContainer }>
                <div className={ classes.bioContainer }>
                    <h5>Bio</h5> 
                    <p>{ !isEmpty(props.bio) ? props.bio : "Looks like this profile doesn't have a bio yet!" } </p>
                </div>
                <div className={ classes.langsContainer }>
                    <h5>Fluent languages:</h5>
                    {props.langs.length > 0 ? <ul>{ langs(props.langs) }</ul> : <em>No languages yet</em>}
                    
                </div>
            </div>
        </div>
    )
}
