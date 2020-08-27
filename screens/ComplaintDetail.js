import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import { Caption } from 'react-native-paper'
import {globalStyles} from '../shared/global'
import Card from '../shared/Card'
import moment from 'moment'
import UserAvatar from 'react-native-user-avatar';
import {IMAGE_URL} from '../shared/global'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'; 
import {resolveToggle,getComplaints} from '../actions/complaintAction'
import {useDispatch,useSelector} from 'react-redux'

function DetailsArticle({route,navigation}) {
    const dispatch = useDispatch()
    const [complaint, setComplaint] = useState(route.params)
    const [resolved,setResolved]=useState(route.params.resolved)
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        return () => {
            dispatch(getComplaints())
        }
    })
    const toggleAction=()=>{
        dispatch(resolveToggle(complaint.id))
        setResolved(!resolved)
    }
    return (
        <View style={{...globalStyles.container,...styles.container}}>
            <View style={styles.picture}>
                {complaint.user.avatar===null ? <UserAvatar size={70} name={`${complaint.user.firstName} ${complaint.user.lastName}`} />:
                    <UserAvatar size={70} name="Avishay Bar" src={`${IMAGE_URL}/${complaint.user.avatar}`} />}
            </View>
            <Text style={styles.title}>Complaint details</Text>
            <View style={styles.creation}>
                <Caption>{'Created '} 
                    <Text style={{fontWeight:'bold'}}>
                        {moment(complaint.created_at).fromNow()} 
                    </Text>
                    {' by'} <Text style={{fontWeight:'bold'}}>
                            {`${complaint.user.firstName} ${complaint.user.lastName}` }
                        </Text>
                </Caption>
            </View>
            {(user.role === 'super-admin' || user.role === 'admin') && 
                <View style={styles.resolved}>
                    <TouchableOpacity onPress={toggleAction}>
                        <Icon name="checkcircle" size={23} color={resolved ? 'green':'black'} />
                    </TouchableOpacity>
                    <Caption style={{marginLeft:8}}>{resolved ? 'Unresolve':'Resolve'}</Caption>
                </View>
            }

            <ScrollView>
                <Card>
                    <View>
                        <Text style={styles.cardTitle}>Body</Text>
                        <Text style={styles.cardContent}>{complaint.body}</Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18
    },
    creation:{
        alignItems:'center',
        marginVertical:5
    },
    card:{
        minHeight:130,
        minWidth:100,
        maxWidth:100,
        justifyContent:'center',
        alignItems:'center'
    },
    cardTitle:{
        fontWeight:'bold',
        textAlign:'center'
    },
    cardContent:{
        marginVertical:8,
        textAlign:'center'
    },
    tags:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:15
    },
    tag:{
        marginHorizontal:5
    },
    picture:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:8
    },
    resolved:{
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:5
    }
})

export default DetailsArticle;

