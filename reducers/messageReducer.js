import { GET_MESSAGES,LOADING_MESSAGES, SEND_MESSAGE } from "../actions/types";

const initialState={
    messages:[],
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_MESSAGES:
            return{
                ...state,
                messages:[],
                laoding:true
            }
        case GET_MESSAGES:
            return{
                ...state,
                loading:false,
                messages:action.payload
            }
        case SEND_MESSAGE:
            return{
                ...state,
                loading:false,
                messages:[...state.messages,action.payload]
            }
        default:
            return state
    }
}