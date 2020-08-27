import {LOADING_COMMENTS, GET_COMMENTS, ADD_COMPLAINTS, ADD_COMMENT} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const getToken=async()=>{
    return new Promise(async(resolve,reject)=>{
        let token=await AsyncStorage.getItem('token');
        resolve(token)
    })
}

export const getComments=(id)=>dispatch=>{
    dispatch({type:LOADING_COMMENTS})
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/comments/${id}`,config)
        .then((res)=>{
            dispatch({
                type:GET_COMMENTS,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const addRemoteComment=(id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/comments/${id}`,config)
        .then((res)=>{
            dispatch({
                type:GET_COMMENTS,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const addComments=(body,id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.post(`${URL}/comments/${id}`,body,config)
        .then((res)=>{
            console.log(res.data)
            dispatch({
                type:ADD_COMMENT,
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