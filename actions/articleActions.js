import {ADD_ARTICLE, DELETE_ARTICLE,UPDATE_ARTICLE, GET_ARTICLES,GET_CATEGORIES, LIKE_ARTICLE, DISLIKE_ARTICLE} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const getToken=async()=>{
    return new Promise(async(resolve,reject)=>{
        let token=await AsyncStorage.getItem('token');
        resolve(token)
    })
}

export const getArticles=()=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/article`,config)
        .then((res)=>{
            dispatch({
                type:GET_ARTICLES,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const getCategories=()=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/category`,config)
        .then((res)=>{
            dispatch({
                type:GET_CATEGORIES,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const addArticle=(info)=>dispatch=>{
    getToken().then(token=>{
        console.log(token)
        const config={
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':'Bearer '+token,
            }
        }
        axios.post(`${URL}/article`,info,config)
        .then((res)=>{
            dispatch({
                type:ADD_ARTICLE,
                payload:res.data.article
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const updateArticle=(info,id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token);
        axios.put(`${URL}/article/${id}`,info,config)
        .then((res)=>{
            console.log(res.data);
            dispatch({
                type:UPDATE_ARTICLE
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const deleteArticle=(id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.delete(`${URL}/article/${id}`,config)
        .then((res)=>{
            dispatch({
                type:DELETE_ARTICLE,
                payload:id
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const like=(id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.post(`${URL}/articles/like/${id}`,{},config)
        .then((res)=>{
            dispatch({
                type:LIKE_ARTICLE,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const dislike=(id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.post(`${URL}/articles/dislike/${id}`,{},config)
        .then((res)=>{
            dispatch({
                type:DISLIKE_ARTICLE,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}


const getConfig=(token)=>{
    return {
        headers:{
            'Content-type':'application/json',
            'Authorization':'Bearer '+token
        }
    }
}