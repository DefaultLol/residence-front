import { LOGIN_SUCCESS, LOGOUT_SUCCESS,REGISTER_SUCCESS,LOADING_ACTION,AUTH_ERROR, EDIT_USER } from "../actions/types";

const initialState={
    token:null,
    auth:false,
    loading:false,
    user:{},
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_ACTION:
            return{
                ...state,
                auth:false,
                loading:true,
                error:null
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                auth:true,
                user:action.payload.user,
                loading:false,
                error:null,
                token:action.payload.token
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null
            }
        case EDIT_USER:{
            return{
                ...state,
                user:action.payload
            }
        }
        case AUTH_ERROR:{
            return{
                ...state,
                loading:false,
                auth:false,
                error:'Error in inputs'
            }
        }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                auth:false,
                error:null
            }
        default:
            return state
    }
}