import React,{useState,useEffect} from 'react'
import { StyleSheet, View,Text,TouchableWithoutFeedback,Keyboard,TextInput,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'; 
import {globalStyles} from '../shared/global';
import {useDispatch} from 'react-redux';
import {addComplaint} from '../actions/complaintAction'
import Button from '../shared/Button';
import { Title } from 'react-native-paper';


function AddComplaint({ navigation }) {
    const dispatch=useDispatch()
    const [body, setBody] = useState(null)

    const onSubmit=()=>{
        const data={body}
        dispatch(addComplaint(data))
        navigation.navigate('Complaints')
    }

    return (
        <View style={globalStyles.container}>
            <View>
                <Title style={styles.title}>Add a Complaint</Title>
            </View>
            <View style={styles.form}>
                <TextInput style={globalStyles.input} placeholder='Complaint body' onChangeText={(val)=>setBody(val)}  />
                <Button text='Submit' onPress={onSubmit} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        textAlign:'center'
    },
    form:{
        flex:1,
        justifyContent:'center'
    }
})


export default AddComplaint;