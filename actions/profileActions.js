import {EDIT_USER, LOADING_EDIT_USER} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const getToken=async()=>{
    return new Promise(async(resolve,reject)=>{
        let token=await AsyncStorage.getItem('token');
        resolve(token)
    })
}

const setUser=async(user)=>{
    await AsyncStorage.setItem('user',JSON.stringify(user))
}

export const updateUser=(body)=>dispatch=>{
    dispatch({type:LOADING_EDIT_USER})
    getToken().then(token=>{
        const config=getConfig(token);
        axios.post(`${URL}/profile`,body,config)
        .then((res)=>{
            setUser(res.data.user)
            dispatch({
                type:EDIT_USER,
                payload:res.data.user
            })
        }).catch(err=>{
            //console.log(err.response.data)
            console.log('error')
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