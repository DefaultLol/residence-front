import { GET_ARTICLES,DELETE_ARTICLE,GET_CATEGORIES, ADD_ARTICLE, UPDATE_ARTICLE, LIKE_ARTICLE, DISLIKE_ARTICLE, LOADING_ARTICLES } from "../actions/types";

const initialState={
    articles:[],
    categories:[],
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_ARTICLES:
            return{
                ...state,
                loading:true
            }
        case GET_ARTICLES:
            return{
                ...state,
                articles:action.payload,
                loading:false
            }
        case ADD_ARTICLE:
            return {
                ...state,
                articles:[action.payload[0],...state.articles]
            }
        case UPDATE_ARTICLE:
            return state
        case DELETE_ARTICLE:
            return{
                ...state,
                articles:state.articles.filter(article => article.id!==action.payload)
            }
        case GET_CATEGORIES:
            return{
                ...state,
                categories:action.payload
            }
        case DISLIKE_ARTICLE:
        case LIKE_ARTICLE:{
            return {
                ...state,
                articles:action.payload
            }
        }
        default:
            return state
    }
}