import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback,Keyboard, ActivityIndicator,FlatList,TouchableOpacity } from 'react-native'
import UserAvatar from 'react-native-user-avatar';
import AsyncStorage from '@react-native-community/async-storage'
import {useSelector} from 'react-redux'
import {globalStyles} from '../shared/global'
import {Caption} from 'react-native-paper'
import axios from 'axios';
import {URL} from '../shared/global';
import moment from 'moment';
import {IMAGE_URL} from '../shared/global'

function Chat({navigation}) {
    const user = useSelector(state => state.auth.user)
    const [users,setUsers] = useState([])
    const [baseUsers,setBaseUsers]=useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const getToken=async()=>{
        return new Promise(async(resolve,reject)=>{
            let token=await AsyncStorage.getItem('token');
            resolve(token)
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

    useEffect(() => {
        getToken().then(token=>{
            const config=getConfig(token);
            axios.get(`${URL}/search/getAll`,config)
            .then((res)=>{
                setBaseUsers(res.data)
                setUsers(res.data)
                setLoading(false)
            }).catch((err)=>{
                console.log(err.response.data)
            })
        })
    },[])

    const search=(name)=>{
        setLoading(true);
        getToken().then(token=>{
            const config=getConfig(token);
            let body={name:name};
            body=JSON.stringify(body);
            if(name===''){
                setUsers(baseUsers)
                setLoading(false)
            }
            else{
                axios.post(`${URL}/messages/search`,body,config)
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

    const handleRefresh=()=>{
        setRefreshing(true)
        getToken().then(token=>{
            const config=getConfig(token);
            axios.get(`${URL}/search/getAll`,config)
            .then((res)=>{
                setBaseUsers(res.data)
                setUsers(res.data)
                setLoading(false)
            }).catch((err)=>{
                console.log(err.response.data)
            })
        })
        console.log('yaaaaaaa refresh')
        setRefreshing(false)
    }
    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                {user.avatar===null ? <UserAvatar size={40} name={`${user.firstName} ${user.lastName}`} />:
                    <UserAvatar size={40} name="Avishay Bar" src={`${IMAGE_URL}/${user.avatar}`} />}
                <Text style={styles.title}>Chats</Text>
            </View>
            <View style={styles.search}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput style={{...globalStyles.input,...styles.input}} onChangeText={(val)=>search(val)} placeholder='Search for users' />
                </TouchableWithoutFeedback>
            </View>
            {loading ? <ActivityIndicator size="large" color="#00ff00" />:
            <FlatList refreshing={refreshing} onRefresh={handleRefresh} data={users} renderItem={({item})=>{
                if(item.user.id!==user.id){
                    return(
                        <TouchableOpacity onPress={()=>navigation.navigate('Messages',item.user)}>
                            <View style={styles.global}>
                                <View style={styles.chat}>
                                {user.avatar===null ? <UserAvatar size={40} name={`${item.user.firstName} ${item.user.lastName}`} />:
                                    <UserAvatar size={40} name={`${item.user.firstName} ${item.user.lastName}`} src={`${IMAGE_URL}/${item.user.avatar}`} />}
                                    <View style={styles.chatInfo}>
                                        <Text style={styles.username}>{`${item.user.firstName} ${item.user.lastName}`}</Text>
                                        <Caption style={styles.message}>{item.last!==null ?
                                        (item.last.body.length > 28 ? item.last.body.substr(0,28)+'...':item.last.body):'Say hi :) !'}</Caption>
                                    </View>
                                </View>
                                <View>
                                    <Caption style={{fontSize:10}}>{item.last!==null ? moment(item.last.created_at).format('LT'):''}</Caption>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
            }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        fontSize:26,
        fontWeight:'bold',
        marginLeft:8,
        marginTop:-3
    },
    global:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    input:{
        borderRadius:30,
        padding:10,
        paddingLeft:21,
        marginVertical:15
    },
    chatContainer:{
        marginTop:1,
    },
    chat:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:8
    },
    chatInfo:{
        marginLeft:8
    },
    username:{
        marginTop:4
    },
    message:{
        fontSize:12
    }
})

export default Chat;
