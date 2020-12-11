import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';

//==========STYLING=========\\
import classes from './CreateDiscussion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faReact, faAngular, faVuejs, faLaravel } from '@fortawesome/free-brands-svg-icons';


//=======REDUX ACTIONS======\\
import { 
    setFlagSuccess, 
    setFlagError, 
} from '../../../actions/flagActions';


export default function CreateDiscussion() {

    const dispatch = useDispatch();


    let { title, setTitle } = useState("");
    let { body, setBody } = useState("");
    let { tag, setTag } = useState([]);

    let typeClick = (e) => {
        e.preventDefault();
    }

    const formSubmit = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const data = {
            title,
            body,
            tag
        }

        //pass discussion data
        axios.post(process.env.REACT_APP_PROXY + '/discuss/create', data)
            .then((res)=> {
                // dispatch success flag
                dispatch(setFlagSuccess(res.data.flag.success ))
            })
            .catch((err, res) => {
                const data = err.response.data;
                if(err.response){
                    //dispatch error flag
                    dispatch(setFlagError(data.flag.err));
                }
            })
    }

    return (
        <div className={ classes.createPostCntr }>
            <h3>Start a thread</h3>
            <form
             onSubmit={(e) => formSubmit(e)}
            >
                
                <label 
               htmlFor="title"
                >
                    Topic:
                </label>

                <input
                name="title"
                className={classes.postInput}
                type='text' 
                />

                <div className={ classes.labelCntr }>

                    <label 
                   htmlFor="body"
                    >
                        Elaborate your discussions topic:
                    </label>

                    <div className={ classes.postInputCntr}>
                        <input 
                        className={classes.postInput}
                        type='text' 
                        />
                        
                        <input
                        className={classes.submit + ' btn btnSuccess'}
                        type='submit'
                        />
                    </div>
                </div>
               
                
                <div 
                className={classes.typeCtnr}
                >
                    <button
                    onClick={ (e) => typeClick(e) }
                    className={classes.typeInput + ' ' + classes.react}
                    >
                        <FontAwesomeIcon icon={ faReact } />
                    </button>

                    <button
                    onClick={ (e) => typeClick(e) }
                    className = {classes.typeInput + ' ' + classes.angular}
                    >
                        <FontAwesomeIcon icon={ faAngular } />
                    </button>

                    <button
                    onClick={ (e) => typeClick(e) }
                    className={ classes.typeInput + ' ' + classes.vue }
                    >
                        <FontAwesomeIcon icon={ faVuejs } />
                    </button>

                    <button
                    onClick={ (e) => typeClick(e) }
                    className={classes.typeInput + ' ' + classes.laravel}
                    >
                        <FontAwesomeIcon icon={ faLaravel } />
                    </button>
                    <button
                    onClick={ (e) => typeClick(e) }
                    className={classes.typeInput + ' ' + classes.ellipsis}
                    >
                        <FontAwesomeIcon icon={ faEllipsisH } />
                    </button>

                    <p className={ classes.choose }> Choose what type of thread this is for </p>
                </div>
                
            </form>
        </div>
    )
}
