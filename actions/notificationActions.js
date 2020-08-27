import {GET_NOTIFS,DELETE_NOTIF,LOADING_NOTIF} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const getToken=async()=>{
    return new Promise(async(resolve,reject)=>{
        let token=await AsyncStorage.getItem('token');
        resolve(token)
    })
}

export const getNotifs=()=>dispatch=>{
    dispatch({type:LOADING_NOTIF})
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/notification`,config)
        .then((res)=>{
            dispatch({
                type:GET_NOTIFS,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const deleteNotif=(id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.delete(`${URL}/notification/${id}`,config)
        .then((res)=>{
            dispatch({
                type:DELETE_NOTIF,
                payload:id
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