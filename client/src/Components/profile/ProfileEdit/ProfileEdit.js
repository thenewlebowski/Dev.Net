import React, {useState, useEffect} from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './ProfileEdit.module.css';
import { useDispatch } from 'react-redux';
import isEmpty  from 'is-empty';
import axios from 'axios';

//=======REDUX ACTIONS======//
import { 
    setFlagSuccess, 
    setFlagError, 
} from '../../../actions/flagActions';



export default function ProfileEdit(props) {
    /**
     * @param lang
     * @param picUrl **CURRENTLY NOT IN USE
     * @param bio
     * @param username 
     * @desc state for the current profile edit
     */

    const dispatch = useDispatch();

    // const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [langs, setLangs] = useState([]);
    const [tempLang, setTempLang] = useState('');
    const [errs, setErrs] = useState({});
    // const [picUrl, setPicUrl] = useState(profilePicture);
    // const [imageModVisible, setimageModVisible] = useState(false)
    
    let onSubmit = (e) =>{
        e.preventDefault();
        e.stopPropagation();

        //set user data object
        const userData = {
            langs,
            bio,
        }

        //pass user data
        axios.post(process.env.REACT_APP_PROXY + '/p/edit', userData)
            .then((res)=> {
                props.editToggle()
                // dispatch success flag
                dispatch(setFlagSuccess(res.data.flag.success))
            })
            .catch((err, res) => {
                const data = err.response.data;
                if(err.response){
                    //dispatch error flag
                    dispatch(setFlagError(data.flag.err));
                }
            })
    }

    useEffect(()=> {
        // setUsername(props.data.username);
        setBio(props.data.bio);
        setLangs(props.data.langs);
    },[]);

    //=====FUNCTIONS=======//
    
    let mapLangs = () => {
        return(
        <Auxiliary>
            <div>
                {langs.length > 0 ? langs.map((lang, i)=>(
                    <div key={i}>
                        <button
                        type='button'
                        className={'btn btnSmall btnDanger fas fa-minus'}
                        onClick={(e) => handleLangsRemove(e)}
                        value={lang}
                        />
                        {lang}
                    </div>
                )) : null}
            </div>
        </Auxiliary>
        )
    }

    let handleLangsRemove = (e) =>
    {
        e.stopPropagation();

        setErrs({
            ...errs,
            langs:""
        })

        if(!e.target.value)
        {
            return setErrs({ //Err Handling
                ...errs,
                langs : "An Error Occurred please try again later"
            })

        }

        let newLangs = langs.filter( lang => lang !== e.target.value);
        setLangs(newLangs);
        console.log(newLangs);
    }
    
    let handleLangsAdd = (e) =>
    {
         
        e.stopPropagation();

        setErrs({
            ...errs,
            langs:""
        })
        //checks to see if entry is empty      ||    if lang is already in array
        if(e.target.value === "" || langs.filter(lang => lang === e.target.value).length > 0)
        {
            return setErrs({ //Err handling 
                ...errs,
                langs: "Please enter in proper value"
            })
        } 
        //if no error then set new langs
        let newLangs = langs;
        newLangs.push(e.target.value);
        setTempLang('');
        return setLangs(newLangs);
    }

    let btnClasses = [classes.btn]
    return (
        <form className={classes.profileDesc} encType='' onSubmit={(e) => onSubmit(e)}>

            <div className={ classes.descHeader }>

                <div className={classes.usernameContainer } >
                    <h5>Username</h5>
                    <h4>{props.username}</h4>
                </div>
                
                <div className="btnContainer">
                    <button 
                    type='button'
                    className={'btn btnDanger'} 
                    onClick={props.editToggle}>
                        {props.data.editMode ? "Cancel" : "Edit"}
                    </button>
                </div>
            </div>
            

            <div className={ classes.infoContainer }>

                <div className={ classes.bioContainer }>
                    <h5>Bio</h5>
                    <textarea
                    placeholder={ !isEmpty(bio) ? null : "Please enter in a short paragraph about yourself" }
                    onChange={ (e) => setBio(e.target.value) }
                    className={classes.bioTextarea}
                    value={bio}
                    name='bio'/>
                </div>

                <div className={ classes.langsContainer }>
                    <h5>Fluent languages:</h5>
                    <span>{errs.langs}</span>
                    {mapLangs()}

                    <div>
                        
                        <button
                        type='button'
                        className={'btn btnSmall btnSuccess fas fa-plus'}
                        onClick={handleLangsAdd}
                        value = {tempLang}
                        /> 
                        
                        <input 
                        type="text" 
                        value={tempLang}
                        onChange={ e => setTempLang(e.target.value)}/>

                    </div>
                </div>
            </div>
            <div className={classes.submitContainer}>
                <input className={'btn btnSuccess'} type='submit' value='Submit'/> 
            </div>
        </form>
    )
}
