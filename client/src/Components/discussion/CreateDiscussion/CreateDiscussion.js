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



export default function CreateDiscussion(props) {

    const dispatch = useDispatch();

    let [ errClass, setErrClass ] = useState(['errSpan', 'o-0']);
    let [ errors, setErrors ] = useState({});
    let [ title, setTitle ] = useState("");
    let [ body, setBody ] = useState("");
    let [ tags, setTags ] = useState([]);

    useEffect(() => {
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

    //tag button listener
    const handleTagChange = (e, type) => {
        e.preventDefault();
        let arr = [...tags, type];
        //  arr = _.xor(arr, type);
        // arr.filter((item, index) => )
        // arr.forEach((item, index) => {
        //     item === type ? arr.splice(index - 1, 1) : arr.push(type);
        // });
        // if(arr.length < 1 ) arr.push(type);

        
        // let arr = [...tag, type];
        // console.log(arr);
        // arr = findDuplicates(arr);
        // console.log(arr);
        setTags(arr)
        // console.log(tag);
    }

    const formSubmit = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const data = {
            title,
            body,
            tags
        }

       
        //error handling 
        if(isEmpty(data.title) || isEmpty(data.body)) {
            let currErr = {}
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
                //set form back to default values
                setTitle('');
                setBody('');
                setTags([]);
                // dispatch success flag
                //adds discussion to parent element
                props.addDiscussion(data);
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
                value = {title}
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
                        value = { body }
                        className={ classes.postInput }
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
                    value="react"
                    onClick={ (e) => handleTagChange(e, 'react') }
                    className={classes.typeInput + ' ' + classes.react}
                    >
                        <FontAwesomeIcon icon={ faReact } />
                    </button>

                    <button
                    value="angular"
                    onClick={ (e) => handleTagChange(e, 'angular') }
                    className = {classes.typeInput + ' ' + classes.angular}
                    >
                        <FontAwesomeIcon icon={ faAngular } />
                    </button>

                    <button
                    value="vue"
                    onClick={ (e) => handleTagChange(e, 'vue') }
                    className={ classes.typeInput + ' ' + classes.vue }
                    >
                        <FontAwesomeIcon icon={ faVuejs } />
                    </button>

                    <button
                    value='laravel'
                    onClick={ (e) => handleTagChange(e, 'laravel') }
                    className={classes.typeInput + ' ' + classes.laravel}
                    >
                        <FontAwesomeIcon
                        icon={ faLaravel } 
                        />
                    </button>

                    <button
                    value="other"
                    onClick={ (e) => handleTagChange(e, 'other') }
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
