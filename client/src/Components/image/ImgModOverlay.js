import React, {useState, useEffect} from 'react'

//========Styling=======//
import classes from './ImgModOverlay.module.css';

export default function ImgModOverlay(props) {
    const [visible, setVisiblity] = useState(false); //must be boolean value
    
    useEffect(()=>{
        console.log('[ImgModOverlay] props.visible changed')
        setVisiblity(props.visible)
    }, [props.visible])

    function handleClickAway(){
        props.imgModVisibility(!props.visible);
    }

    return visible ? (
        <div className={classes.background} onClick={handleClickAway}> 
            <div className={classes.imgModContainer}></div>
        </div>
    ) : null
}
