import React,{useState,useEffect} from 'react'
import { Modal, StyleSheet, View,Text,TouchableWithoutFeedback,Keyboard,TouchableOpacity,ActivityIndicator,FlatList,TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'; 
import {useDispatch,useSelector} from 'react-redux';
import CommentTemp from '../shared/CommentTemp'
import { addComments, getComments,addRemoteComment } from '../actions/commentActions';
import Icons from 'react-native-vector-icons/FontAwesome'; 
import Pusher from 'pusher-js/react-native';

function Comment({show,closeModal,id,navigation}) {
    const dispatch=useDispatch()
    const user = useSelector(state => state.auth.user)
    const loading=useSelector(state=>state.comment.loading)
    const comments = useSelector(state => state.comment.comments)
    const [refreshing, setRefreshing] = useState(false)
    const [comment, setComment] = useState('')
    let myFlatListRef;

    const handleRefresh=()=>{
        setRefreshing(true)
        console.log(id)
        dispatch(getComments(id))
        setRefreshing(false)
    }
    const send=()=>{
        const info={body:comment}
        dispatch(addComments(info,id))
        setComment('')
    }
    useEffect(() => {
        console.log('opening model')
        Pusher.logToConsole = true;

        var pusher = new Pusher('52bef6685fa7fd501300', {
            cluster: 'eu'
        });
        var channel = pusher.subscribe(`comment-channel-${id}`);
        channel.bind('comment-event', function(data) {
            console.log('nani',data)
            if(data.sender!==user.id){
                dispatch(addRemoteComment(data.id))
                myFlatListRef.scrollToEnd({animated:true})
            }
        });
        
    }, [])
    return (
        <Modal visible={show}>
            <View style={styles.container}>
                <View style={styles.messagesContainer}>
                    <TouchableOpacity>
                        <Icon name='close' size={18} onPress={closeModal} style={{...styles.modalToggle,...styles.modalClose}} />
                    </TouchableOpacity>
                    {loading ? <ActivityIndicator size="large" color="#00ff00" />:
                        (comments.length===0 ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Text>Be the first to comment !</Text>
                            </View>:
                        <FlatList
                            style={{marginTop:15}}
                            onLayout={ () => { myFlatListRef.scrollToEnd({animated:true}) } } 
                            ref={ (ref) => { myFlatListRef = ref } } 
                            refreshing={refreshing}
                            onRefresh={()=>handleRefresh()} 
                            data={comments} 
                            renderItem={({item})=>(
                                <View>
                                    <CommentTemp user={item.user} body={item.body} date={item.created_at} navigation={navigation} closeModal={closeModal} />
                                </View>
                            )}>
                        </FlatList>)
                    }
                </View>
                <View style={styles.inputContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput 
                            multiline={true}
                            value={comment}
                            style={styles.input} 
                            placeholder='Type a message...'
                            onChangeText={(val)=>setComment(val)}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={send}>
                        <Icons name="send" color="#009387" size={30} style={styles.send} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalToggle:{
        marginBottom:10,
        borderWidth:1,
        borderColor:'#f2f2f2',
        padding:10,
        borderRadius:10,
        alignSelf:'center'
    },
    modalClose:{
        marginTop:20,
        marginBottom:0
    },
    modalContent:{
        flex:1
    },
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
        alignItems:'center',
        marginBottom:15
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        fontSize:15,
        borderRadius:20,
        paddingLeft:21,
        width:'85%',
    },
    send:{
        marginRight:9
    }

})


export default Comment;