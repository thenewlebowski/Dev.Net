import React, { useState, useEffect, useRef } from 'react';

//==========STYLING========//
import classes from './Loader.module.css';

//========COMPONENTS======//
import ReactLoader from 'react-loader-spinner';

export default function Loader(props) {

    const [timer, setTimer] = useState(props.timer || 3000);
    const [styles, setStyles] = useState([classes.loader]);
    const timeoutRef = useRef(null);

    useEffect( ()=> (
        fadeOut(),
        () => clearTimeout(fadeOut)
    ), []);

    
    let fadeOut = () => setTimeout(() => {
        setStyles([...styles, classes.fadeOut]);
        // console.log(classes);
    }, timer - props.delay);
    
    let style = {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: '9998',
        display: 'flex',
        alignItems: 'center',
    }
    
    return (
        <div
        className={styles.join(' ')}
        style={style}
        >
            <ReactLoader
            style   = {{margin: 'auto', boxShadow: '20px 20px #888888', backgroundColor : '#CFD7C7', borderRadius: '10px'}}
            color   = "#40798C"
            timeout = { timer }
            center  = { true }
            type    = "Audio"
            height  = { 500 }
            width   = { 500 }
            />
        </div>
    )
}
