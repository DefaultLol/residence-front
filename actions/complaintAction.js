import {LOADING_COMPLAINTS,GET_COMPLAINTS,ADD_COMPLAINTS,EDIT_COMPLAINT,DELETE_COMPLAINT,RESOLVE_COMPLAINT} from './types'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import {URL} from '../shared/global'

const getToken=async()=>{
    return new Promise(async(resolve,reject)=>{
        let token=await AsyncStorage.getItem('token');
        resolve(token)
    })
}

export const getComplaints=()=>dispatch=>{
    dispatch({type:LOADING_COMPLAINTS})
    getToken().then(token=>{
        const config=getConfig(token)
        axios.get(`${URL}/complaints`,config)
        .then((res)=>{
            dispatch({
                type:GET_COMPLAINTS,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const addComplaint=(body)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        const data=JSON.stringify(body)
        axios.post(`${URL}/complaints`,data,config)
        .then((res)=>{
            console.log('wtf',res.data)
            dispatch({
                type:ADD_COMPLAINTS,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const editComplaint=(body,id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        const data=JSON.stringify(body)
        axios.put(`${URL}/complaints/${id}`,data,config)
        .then((res)=>{
            dispatch({
                type:EDIT_COMPLAINT,
                payload:res.data
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const deleteComplaint=(id)=>dispatch=>{
    getToken().then(token=>{
        const config=getConfig(token)
        axios.delete(`${URL}/complaints/${id}`,config)
        .then((res)=>{
            dispatch({
                type:DELETE_COMPLAINT,
                payload:id
            })
        }).catch(err=>{
            console.log(err.response.data)
        })
    })
}

export const resolveToggle=(id)=>dispatch=>{
    console.log('hahahah')
    getToken().then(token=>{
        const config=getConfig(token)
        axios.put(`${URL}/resolve/${id}`,{},config)
        .then((res)=>{
            dispatch({
                type:RESOLVE_COMPLAINT,
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