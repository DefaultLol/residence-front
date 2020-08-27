import { LOADING_EDIT_USER,EDIT_USER } from "../actions/types";

const initialState={
    loading:false,
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_EDIT_USER:
            return{
                ...state,
                loading:true,
            }
        case EDIT_USER:
            return{
                ...state,
                loading:false
            }
        default:
            return state
    }
}