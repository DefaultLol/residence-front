import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { globalStyles } from './global';
import UserAvatar from 'react-native-user-avatar';
import { Caption } from 'react-native-paper';
import moment from 'moment';
import {IMAGE_URL} from '../shared/global'

function Comment({user,body,date,navigation,closeModal}) {
    const navigate=()=>{
        navigation.navigate('ForeignProfile',user)
        setTimeout(()=>{
            closeModal()
        },150)
    }
    return (
        <View style={{...globalStyles.container,...styles.container}}>
            {user.avatar===null ? <UserAvatar size={45} name={`${user.firstName} ${user.lastName}`} />:
                <UserAvatar size={45} name="Avishay Bar" src={`${IMAGE_URL}/${user.avatar}`} />}
            <View style={styles.info}> 
                <View style={styles.body}>
                    <TouchableOpacity onPress={navigate}>
                        <Text style={{fontWeight:'bold'}}>{`${user.firstName} ${user.lastName}`}</Text>
                    </TouchableOpacity>
                    <Caption style={{fontSize:14}}>{body}</Caption>
                </View>
                <Caption style={{marginLeft:20,fontSize:12}}>{moment(date).fromNow()}</Caption>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'flex-start',
        marginTop:-20
    },
    info:{
        
    },
    body:{
        backgroundColor:'#e8e8e8',
        paddingVertical:10,
        paddingHorizontal:18,
        borderRadius:15,
        marginLeft:10,
        maxWidth:200
    }
})

export default Comment;
