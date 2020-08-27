import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet,Text,View,ActivityIndicator,FlatList,TouchableOpacity, Button } from 'react-native'
import UserAvatar from 'react-native-user-avatar';
import {getComplaints,addComplaint,deleteComplaint} from '../actions/complaintAction'
import Icon from 'react-native-vector-icons/AntDesign'; 
import Card from '../shared/Card'
import moment from 'moment'
import { Caption } from 'react-native-paper';
import {IMAGE_URL} from '../shared/global'

function Complaints({navigation}) {
    const dispatch = useDispatch()
    const complaints = useSelector(state => state.complaint.complaints)
    const loading = useSelector(state => state.complaint.loading)
    const [refreshing, setRefreshing] = useState(false)
    const user = useSelector(state => state.auth.user)
    
    useEffect(() => {
        dispatch(getComplaints())
    }, [])

    const handleRefresh=()=>{
        setRefreshing(true)
        dispatch(getComplaints())
        setRefreshing(false)
    }
    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>Complaints</Text>
            {loading ? <View style={styles.loading}><ActivityIndicator color='blue' size="large" /></View>:
                <>
                    {complaints.length === 0 ? <View style={styles.noData}>
                        <Text>No complaints found !</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('AddComplaints')}>
                            <Caption>Add new complaint</Caption>
                        </TouchableOpacity>
                        </View>:
                        <View style={styles.content}>
                            <TouchableOpacity style={styles.plus}>
                                <Icon name="pluscircleo" onPress={()=>navigation.navigate('AddComplaints')} size={25} />
                            </TouchableOpacity>
                            <FlatList
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                keyExtractor={(item, index) => item.id}
                                data={complaints} 
                                renderItem={(({item})=>(
                                    <TouchableOpacity onPress={()=>navigation.navigate('ComplaintDetail',item)}>
                                        <Card>
                                            <View style={styles.container}>
                                                <View style={styles.leftContent}>
                                                    {item.user.avatar===null ? <UserAvatar size={50} name={`${item.user.firstName} ${item.user.lastName}`} />:
                                                        <UserAvatar size={50} name="Avishay Bar" src={`${IMAGE_URL}/${item.user.avatar}`} />}
                                                    <View style={styles.info}>
                                                        <Text style={styles.sender}>
                                                            {`${item.user.firstName} ${item.user.lastName}`}
                                                            </Text>
                                                        <Text style={styles.body}>
                                                            {item.body.length >= 20 ? item.body.substr(0,20)+'...':item.body}
                                                        </Text>
                                                        <Caption>{moment(item.created_at).fromNow()}</Caption>
                                                    </View>
                                                </View>
                                                {(user.role==='super-admin' || user.id===item.user_id) && 
                                                    <View style={styles.icons}>
                                                        <TouchableOpacity style={{marginRight:10}}>
                                                            <Icon name='edit' onPress={() => navigation.navigate('EditComplaint',item)} size={21} color='green' />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity>
                                                            <Icon name='delete' onPress={() => dispatch(deleteComplaint(item.id))} size={21} color='red' />
                                                        </TouchableOpacity>
                                                    </View>
                                                }
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
    plus:{
        alignItems:'center',
        marginTop:-15,
        marginBottom:10
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
    },
    body:{
        maxWidth:190
    },
    icons:{
        flexDirection:'row'
    }
})

export default Complaints;