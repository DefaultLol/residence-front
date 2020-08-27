import {GET_EVENTS, LOADING_EVENTS} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const getToken=async()=>{
    return new Promise(async(resolve,reject)=>{
        let token=await AsyncStorage.getItem('token');
        resolve(token)
    })
}

export const getEvents=()=>dispatch=>{
    dispatch({type:LOADING_EVENTS})
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/calendar`,config)
        .then((res)=>{
            dispatch({
                type:GET_EVENTS,
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