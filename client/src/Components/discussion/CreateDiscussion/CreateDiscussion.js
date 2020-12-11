import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react'
import isEmpty from 'is-empty';
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

    

    let [ errClass, setErrClass ] = useState(['errSpan', 'o-0']);
    let [ errors, setErrors ] = useState({});
    let [ title, setTitle ] = useState("");
    let [ body, setBody ] = useState("");
    let [ tag, setTag ] = useState([]);

    useEffect(() => {
        console.log(errors);
        //clean up errors after error occurs
        if(!isEmpty(errors)){
            setTimeout(() => {
                setErrClass(['errSpan']);
                // sets errors back to default after .6s 
                setTimeout(() => setErrors({}), 600)
            }, 5000)
        }
        return () => {
            // cleanup
        }
    }, [errors])

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

       
        if(isEmpty(data.title) || isEmpty(data.body)) {
            let currErr = {}
             //error handling 
            const errStrings = {
                title : "Please enter topic",
                body  : "Please enter in a more elaborate discussion",
            }
            setErrClass(['errSpan', 'o-1']);
            if(isEmpty(data.body))  currErr = {...currErr, body: errStrings.body};
            if(isEmpty(data.title)) currErr = {...currErr, title: errStrings.title};
            setErrors(currErr);
            return
        }

        //pass discussion data
        axios.post(process.env.REACT_APP_PROXY + '/discuss/create', data)
            .then((res)=> {
                // dispatch success flag
                console.log(res);
                // dispatch(setFlagSuccess(res.data.flag.success ))
            })
            .catch((err, res) => {
                if(err.response){
                    const data = err.response.data;
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

                <span
                style = {{float: 'right'}}
                className={errClass.join(' ')}
                >
                    <b>{ errors.title }</b>
                </span>

                <input
                name="title"
                onChange = {(e) => setTitle(e.target.value)}
                className={classes.postInput}
                type='text' 
                />

                <div className={ classes.labelCntr }>

                    <label 
                   htmlFor="body"
                    >
                        Elaborate your discussions topic:
                    </label>
                    
                    <span
                    style = {{float: 'right'}}
                    className={errClass.join(' ')}
                    >
                     <b>{ errors.body }</b>
                    </span>

                    <div className={ classes.postInputCntr}>
                        <input
                        onChange = {(e) => setBody(e.target.value)}
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
