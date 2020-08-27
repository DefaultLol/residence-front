import {GET_MESSAGES,LOADING_MESSAGES, SEND_MESSAGE} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const getToken=async()=>{
    return new Promise(async(resolve,reject)=>{
        let token=await AsyncStorage.getItem('token');
        resolve(token)
    })
}

export const getMessages=(id)=>dispatch=>{
    dispatch({type:LOADING_MESSAGES})
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/messages/${id}`,config)
        .then((res)=>{
            console.log(res.data)
            dispatch({
                type:GET_MESSAGES,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const sendMessage=(body)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        const info=JSON.stringify(body)
        axios.post(`${URL}/messages`,info,config)
        .then((res)=>{
            console.log('data to insert',res.data)
            dispatch({
                type:SEND_MESSAGE,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const saveMessage=(body)=>dispatch=>{
    dispatch({
        type:SEND_MESSAGE,
        payload:body
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