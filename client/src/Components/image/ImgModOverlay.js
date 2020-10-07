import React, {useEffect, useState} from 'react'

//========Styling=======//
import classes from './ImgModOverlay.module.css';

export default function ImgModOverlay(props) {
    const [img, setImg] = useState('');
    function handleClickAway(){
        props.handleImgModToggle(!props.visible);
    }

    function handleClickIn(e){
        e.stopPropagation();
    }


    return props.visible ? (
        <div className={classes.background} onClick={handleClickAway}> 
            <div onClick={handleClickIn} className={classes.imgModContainer}>
                <img src={img}/>
                <input type='file' onChange={ (e) => props.handleUploadImg(e) }/>
            </div>
        </div>
    ) : null
}
