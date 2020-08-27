import { GET_EVENTS,LOADING_EVENTS } from "../actions/types";

const initialState={
    events:[],
    loading:false,
    firstDate:null
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_EVENTS:
            return{
                ...state,
                loading:true
            }
        case GET_EVENTS:
            return{
                ...state,
                events:action.payload.events,
                loading:false,
                firstDate:action.payload.firstDate
            }
        default:
            return state
    }
}