import {
    FLAG_SUCCESS,
    FLAG_ERROR,
} from '../actions/types';

let initalState = {
    error   : null,
    success : null,
};

export default function( state = initalState, action ) {
    switch(action.type){
        case FLAG_ERROR :
            return {
                ...state,
                error: action.payload,
            };
        case FLAG_SUCCESS : 
            return {
                ...state,
                success: action.payload,
            };
        default : 
            return state;
    }
    
}