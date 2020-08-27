import {GET_COMMENTS, LOADING_COMMENTS,ADD_COMMENT } from "../actions/types";

const initialState={
    loading:false,
    comments:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_COMMENTS:
            return{
                ...state,
                loading:true
            }
        case GET_COMMENTS:
            return{
                ...state,
                loading:false,
                comments:action.payload
            }
        case ADD_COMMENT:
            return{
                ...state,
                comments:action.payload
            }
        default:
            return state
    }
}