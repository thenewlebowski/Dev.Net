import React from 'react'

//==========STYLING=========\\
import classes from './CreatePost.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faReact, faAngular, faVuejs, faLaravel } from '@fortawesome/free-brands-svg-icons';

export default function CreatePost() {

    let typeClick = (e) => {
        e.preventDefault();
    }

    return (
        <div className={ classes.createPostCntr }>
            <h3>Start a thread</h3>
            <form>
                <input 
                className={classes.postInput}
                type='text' 
                />
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
