import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet,Text,View,ActivityIndicator,FlatList,TouchableOpacity } from 'react-native'
import UserAvatar from 'react-native-user-avatar';
import {getNotifs,deleteNotif} from '../actions/notificationActions'
import Icon from 'react-native-vector-icons/AntDesign'; 
import Card from '../shared/Card'
import moment from 'moment'
import { Caption } from 'react-native-paper';
import {IMAGE_URL} from '../shared/global'

function Notification({navigation}) {
    const dispatch=useDispatch()
    const loading = useSelector(state=>state.notification.loading)
    const notifs = useSelector(state=>state.notification.notifs)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        console.log('loading',loading)
        dispatch(getNotifs())
    },[])

    const handleRefresh=()=>{
        setRefreshing(true)
        dispatch(getNotifs())
        setRefreshing(false)
    }
    
    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>Notifications</Text>
            {loading ? <View style={styles.loading}><ActivityIndicator color='blue' size="large" /></View>:
                <>
                    {notifs.length === 0 ? <View style={styles.noData}><Text>No Notifications found !</Text></View>:
                        <View style={styles.content}>
                            <FlatList
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                keyExtractor={(item, index) => item.id}
                                data={notifs} 
                                renderItem={(({item})=>(
                                    <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                                        <Card>
                                            <View style={styles.container}>
                                                <View style={styles.leftContent}>
                                                    {item.sender.avatar===null ? <UserAvatar size={50} name={`${item.sender.firstName} ${item.sender.lastName}`} />:
                                                        <UserAvatar size={50} name="Avishay Bar" src={`${IMAGE_URL}/${item.sender.avatar}`} />}
                                                    <View style={styles.info}>
                                                        <Text style={styles.sender}>
                                                            {`${item.sender.firstName} ${item.sender.lastName}`}
                                                            </Text>
                                                        <Text style={styles.body}>{item.body}</Text>
                                                        <Caption>{moment(item.created_at).fromNow()}</Caption>
                                                    </View>
                                                </View>
                                                <View>
                                                    <TouchableOpacity>
                                                        <Icon name='delete' onPress={() => dispatch(deleteNotif(item.id))} size={21} color='red' />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                            ))}  >
        
                            </FlatList>
                        </View>
                    }
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    loading:{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
    },
    noData:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:21,
        fontWeight:'bold',
        marginVertical:15,
        padding:15
    },
    content:{
        padding:14
    },
    info:{
        marginLeft:12
    },
    sender:{
        fontWeight:'bold'
    },
    leftContent:{
        flexDirection:'row',
        alignItems:'center',
        padding:5
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})

export default Notification;