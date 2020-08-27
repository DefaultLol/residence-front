import React,{useState,useEffect} from 'react'
import { StyleSheet,View } from 'react-native'
import {Caption,Text, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import {IMAGE_URL} from '../shared/global'
import UserAvatar from 'react-native-user-avatar';
import Card from '../shared/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'; 
import EditProfile from '../modals/EditProfile'
import {useSelector} from 'react-redux'

export default function Profile() {
    const user = useSelector(state => state.auth.user)
    const [show,setShow] = useState(false)

    const closeModal=()=>{
        setShow(false)
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.first}>
                {Object.entries(user).length !== 0 && user!==undefined ? <EditProfile show={show} body={user} closeModal={closeModal} /> : null}
                <Card>
                    <View>
                        <View style={styles.topInfo}>
                            {user.avatar===null ? <UserAvatar size={70} name={`${user.firstName} ${user.lastName}`} />:
                                <UserAvatar size={70} name="Avishay Bar" src={`${IMAGE_URL}/${user.avatar}`} />}
                            <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
                            <Caption style={styles.caption}>{user.role}</Caption>
                            <Caption style={styles.caption}>Phone : {user.phone}</Caption>
                            <TouchableOpacity style={styles.edit}>
                                <Icon color="green" name="edit" onPress={()=>setShow(true)} size={19} />
                            </TouchableOpacity>
                        </View> 
                    </View>  
                </Card> 
            </View>
            <View style={styles.second}>
                <Card>
                    <Title style={styles.title}>Information résidence</Title>
                </Card>
                <View style={styles.info}>
                    <View style={styles.left}>
                        <TouchableOpacity>
                            <Card>
                                <Title style={styles.title}>Appartement</Title>
                                <Caption style={styles.information}>{user.appart_number}</Caption>
                            </Card>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity>
                            <Card>
                                <Title style={styles.title}>Parking</Title>
                                <Caption style={styles.information}>{user.parking_number}</Caption>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>        
        </View>
    )
}

const styles = StyleSheet.create({
    first:{
        marginVertical:15,
        marginHorizontal:15
    },
    second:{
        marginHorizontal:15
    },
    topInfo:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15
    },
    name:{
        marginVertical:5,
        fontSize:17,
        fontWeight:"bold"
    },
    title:{
        textAlign:"center",
        fontSize:18
    },
    info:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    left:{
        width:150,
    },
    right:{
        width:150
    },
    information:{
        textAlign:'center',
        fontSize:15
    },
    edit:{
        marginTop:3
    }
})
