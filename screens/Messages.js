import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { StyleSheet, View,TouchableWithoutFeedback,Keyboard, ActivityIndicator,FlatList, TextInput, TouchableOpacity} from 'react-native'
import Button from '../shared/Button'
import Sender from '../shared/Sender'
import Receiver from '../shared/Receiver'
import {getMessages,sendMessage,saveMessage} from '../actions/messageActions'
import Pusher from 'pusher-js/react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import sendNotif from '../shared/NotifConf'

export default function Messages({route,navigation}) {
    navigation.setOptions({tabBarVisible:false})
    const dispatch=useDispatch()
    const user = useSelector(state => state.auth.user)
    const [message, setMessage] = useState('')
    const [messager, setMessager] = useState(route.params)
    const messages = useSelector(state => state.message.messages)
    const loading = useSelector(state => state.message.loading)
    const [refreshing, setRefreshing] = useState(false)
    let myFlatListRef;

    useEffect(() => {
        Pusher.logToConsole = true;

        var pusher = new Pusher('52bef6685fa7fd501300', {
            cluster: 'eu'
        });

        var channel = pusher.subscribe(`my-channel-${user.id}`);
        channel.bind('my-event', function(data) {
            if(data.sender===messager.id){
                dispatch(saveMessage(data.data))
            }
            else{
                console.log('not for me')
            }
        });
        myFlatListRef.scrollToEnd({animated:true})
        dispatch(getMessages(messager.id))
        return ()=>{
            pusher.unsubscribe(`my-channel-${user.id}`);
        }
    }, [])
    
    const send=()=>{
        if(message!==''){
            const body={
                receiver_id:messager.id,
                body:message
            }
            dispatch(sendMessage(body))
        }
        setMessage('')
    }
    const handleRefresh=()=>{
        setRefreshing(true)
        dispatch(getMessages(messager.id))
        setRefreshing(false)
    }
    return (
        <View style={styles.container}>
                <View style={styles.messagesContainer}>
                    {loading ? <ActivityIndicator size="large" color="black" /> :
                        <>
                            {user!==undefined &&
                                <FlatList 
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                    onLayout={ () => { myFlatListRef.scrollToEnd({animated:true}) } } 
                                    ref={ (ref) => { myFlatListRef = ref } } 
                                    data={messages} 
                                    renderItem={({item})=>(
                                    <Animatable.View animation="fadeInLeft" duration={750}>
                                        <TouchableOpacity>
                                            {item.sender_id===user.id && <Sender message={item.body} />}
                                            {item.sender_id!==user.id && <Receiver message={item.body} />}
                                        </TouchableOpacity>
                                    </Animatable.View>
                                )} />   
                            }

                        </>
                    }
                </View>
                <View style={styles.inputContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput 
                            multiline={true} 
                            value={message}
                            style={styles.input} 
                            placeholder='Type a message...'
                            onChangeText={(val)=>setMessage(val)} 
                        />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={send}>
                        <Icon name="send" color="#009387" size={30} style={styles.send} />
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        marginTop:5
    },
    messagesContainer:{
        flex:1
    },
    inputContainer:{
        marginHorizontal:6,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        fontSize:15,
        borderRadius:20,
        paddingLeft:21,
        width:'85%'
    },
    send:{
        marginRight:9
    }
})
