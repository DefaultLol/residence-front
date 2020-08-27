import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Keyboard,FlatList,ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Caption} from 'react-native-paper'
import {globalStyles} from '../shared/global'
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {URL} from '../shared/global'
import {useSelector} from 'react-redux'
import {IMAGE_URL} from '../shared/global'

export default function Search({navigation}) {
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.auth.user)
    const [users,setUsers]=useState([])

    const getToken=async()=>{
        return new Promise(async(resolve,reject)=>{
            let token=await AsyncStorage.getItem('token');
            resolve(token)
        })
    }

    useEffect(() => {
        getToken().then(token=>{
            const config=getConfig(token);
            axios.get(`${URL}/search/suggestions`,config)
            .then(res=>{
                setUsers(res.data.data);
                setLoading(false)
            }).catch(err=>{
                console.log(err.data);
                setLoading(false)
            })
        })
    },[])
    const getConfig=(token)=>{
        return {
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
    }
    const promote=(id)=>{
        getToken().then(token=>{
            const config=getConfig(token);
            let body={};
            axios.put(`${URL}/search/promotion/${id}`,body,config)
            .then(res=>{
                console.log(res.data)
                setUsers(prevState=>(
                    prevState.filter(user=>user.id!==id)
                ));
            }).catch(err=>{
                console.log(err.response.data);
            })
        })
    }
    const revoke=(id)=>{
        getToken().then(token=>{
            const config=getConfig(token);
            let body={};
            axios.put(`${URL}/search/revoke/${id}`,body,config)
            .then(res=>{
                console.log(res.data)
                setUsers(prevState=>(
                    prevState.filter(user=>user.id!==id)
                ));
            }).catch(err=>{
                console.log(err.response.data);
            })
        })
    }
    const search=(name)=>{
        setLoading(true);
        getToken().then(token=>{
            const config=getConfig(token);
            let body={name:name};
            body=JSON.stringify(body);
            if(name===''){
                axios.get(`${URL}/search/suggestions`,config)
                .then(res=>{
                    console.log(res.data.data)
                    setUsers(res.data.data);
                    setLoading(false)
                }).catch(err=>{
                    console.log(err.data);
                    setLoading(false)
                })
            }
            else{
                axios.post(`${URL}/search`,body,config)
                .then(res=>{
                    setUsers(res.data);
                    setLoading(false)
                }).catch(err=>{
                    console.log(err.data);
                    setLoading(false)
                })
            }
        })
    }
    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="search1" color="grey" size={20} style={{marginLeft:15}} />
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput onChangeText={(val)=>search(val)} style={styles.input} placeholder='Search for residents' />
                </TouchableWithoutFeedback>
            </View>
            {loading ? <ActivityIndicator size="large" color="#00ff00" />:
            <View style={styles.list}>
                <FlatList data={users} renderItem={({item})=>{
                    if(item.id!==user.id){
                        return(
                            <View style={styles.result}>
                                <View style={styles.info}>
                                    {item.avatar===null ? <UserAvatar size={30} name={`${item.firstName} ${item.lastName}`} />:
                                    <UserAvatar size={30} name="Avishay Bar" src={`${IMAGE_URL}/${item.avatar}`} />}
                                    <TouchableOpacity onPress={()=>navigation.navigate('ForeignProfile',item)}>
                                        <Text style={styles.username}>{`${item.firstName} ${item.lastName}`}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.icon}>
                                    <Caption>{item.role}</Caption>
                                    {user.role==='super-admin' ? <TouchableOpacity>
                                        {item.role!=='admin' ? <Icon name="upcircleo" onPress={()=>promote(item.id)} size={18} color="#009387" style={styles.promotion} />
                                        : <Icon name="downcircleo" onPress={()=>revoke(item.id)} size={18} color="red" style={styles.promotion} />}
                                    </TouchableOpacity>:null}
                                </View>
                            </View>
                        )
                    }
                }} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        padding:3,
        paddingLeft:21,
        marginHorizontal:-15,
        marginVertical:12,
        fontSize:15,
        width:300
    },
    header:{
        flexDirection:'row',
        alignItems:'center'
    },  
    list:{
        borderTopWidth:1,
        borderTopColor:"#ddd",
        marginHorizontal:5,
        paddingTop:15
    },
    info:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:5
    },
    username:{
        marginLeft:12
    },
    result:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:8
    },
    icon:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:12
    },
    promotion:{
        marginLeft:8
    },
    message:{
        marginRight:8
    }
})
