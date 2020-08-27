import {LOGIN_SUCCESS,LOGOUT_SUCCESS,USER_LOADED,AUTH_ERROR,REGISTER_SUCCESS,LOADING_ACTION} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const loginSuccess=async(user,token)=>{
    await AsyncStorage.setItem('user',JSON.stringify(user))
    await AsyncStorage.setItem('token',token)
    await AsyncStorage.setItem('auth','true')
}

const logoutSuccess=async()=>{
    await AsyncStorage.removeItem('user')
    await AsyncStorage.setItem('auth','false')
}

export const loadUser=()=>async(dispatch)=>{
    const auth=await AsyncStorage.getItem('auth')
    const user=JSON.parse(await AsyncStorage.getItem('user'))
    if(auth==='true'){
        dispatch({
            type:LOGIN_SUCCESS,
            payload:{user}
        })
    }
}

export const login=({email,password})=>dispatch=>{
    dispatch({type:LOADING_ACTION})
    const body=JSON.stringify({email,password})
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    axios.post(`${URL}/user/login`,body,config)
    .then((res)=>{
        loginSuccess(res.data.user,res.data.token)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
    }).catch(err=>{
        logoutSuccess()
        dispatch({type:AUTH_ERROR})
    })
}

export const register=(data)=>dispatch=>{
    dispatch({type:LOADING_ACTION})
    const body=JSON.stringify(data);
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    axios.post(`${URL}/user/register`,body,config)
    .then((res)=>{
        console.log(res.data)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    })
}


export const logout=()=>dispatch=>{
    logoutSuccess()
    setTimeout(() => {
        dispatch({
            type:LOGOUT_SUCCESS
        })
    }, 500);

}