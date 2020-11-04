import React, {useState, useEffect} from 'react';
import classes from './Footer.module.css';

//======Higher Order Component======//
import useWindowSize from '../../../hoc/useWindowSize';
import useRootSize from '../../../hoc/useRootSize';

//**********************   NOTE   ****************************//
//============================================================//
//    FOOTER WON'T CHANGE POSITION IF BACK BOTTON IS PUSHED   //
//============================================================//

export default function Footer(props) {
    let [style, setStyle] = useState({
        height: '25vh',
        bottom: '0',
        zIndex: '9999',
        width: '100%',
    });

    const windowSize = useWindowSize();
    const rootSize = useRootSize();
   
    useEffect(() => {
        let position = windowSize.height < rootSize.height ? 'relative' : 'absolute';
        setStyle({...style, position});
    },[rootSize.height])
    
    return (
        <div className={classes.footerContainer} style={style}>
            <span>{windowSize.width}</span>
            <br></br>
            <br></br>
            <br></br>
            <span>{windowSize.height}</span>
        </div>
    )
}
