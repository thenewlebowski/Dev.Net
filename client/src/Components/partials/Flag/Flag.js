import React, { useEffect, useState }         from 'react';
import { useSelector, useDispatch } from 'react-redux';

//=========ACTIONS=======//
import {
    setFlagError,
    setFlagSuccess,
} from '../../../actions/flagActions';

//=========STYLING========//
import classes from './Flag.module.css';

export default function Flag() {

    const [classesArr, setClassesArr] = useState([classes.flag])

    const dispatch = useDispatch();
    
    //set state to be redux state of flag
    const state = useSelector( state => state.flag );
    const success   = state.success;
    const error     = state.error;

    useEffect(()=> {
        // dispatch(setFlagSuccess('Success'))
    },[])

    useEffect(()=>{
        if(success) setClassesArr([...classesArr, classes.success]);
        if(error)   setClassesArr([...classesArr, classes.error]);
        
        console.log(classesArr.join(' '));
        
        setTimeout(() => {
            //set back to default styling
            setClassesArr([classes.flag]);

            setTimeout(() => {
                //set flag state back to inital state
                if( success ) dispatch(setFlagSuccess(null));
                if( error ) dispatch(setFlagError(null));
            }, 500)
            
        }, 5000)

        return () => {
        }
    },[success, error]);

    const jsx = () => {
        if(success){
            return (
                <div>
                    <h1>Success</h1>
                    <p>{success}</p>
                </div>
            )
        } else if(error){
            return (
                <div>
                    <h1>Error</h1>
                    <p>{error}</p>
                </div>
            )
        }
    }
    
    return (
        <div className={classesArr.join(' ')}>
            {jsx()}
        </div>
    )
}
