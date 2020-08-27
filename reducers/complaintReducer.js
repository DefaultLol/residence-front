import { GET_COMPLAINTS,ADD_COMPLAINTS,LOADING_COMPLAINTS, EDIT_COMPLAINT,DELETE_COMPLAINT, RESOLVE_COMPLAINT } from "../actions/types";

const initialState={
    complaints:[],
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_COMPLAINTS:
            return {
                ...state,
                loading:true
            }
        case GET_COMPLAINTS:
            return {
                ...state,
                complaints:action.payload,
                loading:false
            }
        case ADD_COMPLAINTS:
            return {
                ...state,
                complaints:[action.payload,...state.complaints]
            }
        case RESOLVE_COMPLAINT:
            return state
        case EDIT_COMPLAINT:
            const index=state.complaints.findIndex((doc) => doc.id===action.payload.id)
            let data=state.complaints;
            data[index]=action.payload
            console.log('data edited',data)
            return {
                ...state,
                complaints:data
            }
        case DELETE_COMPLAINT:
            return {
                ...state,
                complaints:state.complaints.filter(doc => doc.id !== action.payload)
            }
        default:
            return state
    }
}