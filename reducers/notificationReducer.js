import { GET_NOTIFS,DELETE_NOTIF,LOADING_NOTIF } from "../actions/types";

const initialState={
    notifs:[],
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_NOTIF:
            return {
                ...state,
                loading:true
            }
        case GET_NOTIFS:
            return {
                ...state,
                notifs:action.payload,
                loading:false
            }
        case DELETE_NOTIF:
            return {
                ...state,
                notifs:state.notifs.filter(doc => doc.id !== action.payload)
            }
        default:
            return state
    }
}