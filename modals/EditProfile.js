import React,{useState,useEffect} from 'react'
import { Modal, StyleSheet, View,Text,TouchableWithoutFeedback,Keyboard,ScrollView,TextInput,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'; 
import {globalStyles} from '../shared/global';
import {useDispatch,useSelector} from 'react-redux';
import {updateUser} from '../actions/profileActions'
import Button from '../shared/Button';
import ImagePicker from 'react-native-image-picker';

const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}

function EditArticle({show,closeModal,body}) {
    const dispatch=useDispatch()
    const loading = useSelector(state => state.profile.loading)
    const [file,setFile]=useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [appart_number, setAppartNumber] = useState(null)
    const [parking_number, setParkingNumber] = useState(null)

    useEffect(()=>{
        setFirstName(body.firstName)
        setLastName(body.lastName)
        setPhone(body.phone)
        setAppartNumber(body.appart_number)
        setParkingNumber(body.parking_number)
    },[body])

    const myfun=()=>{
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('Image Picker Error: ', response.error);
          }
      
          else {
            let source = { uri: response.uri };
            setFile(response.data)
          }
        });
    }
    
    const onSubmit=()=>{
        let info={}
        if(file===null){
            console.log('empty')
            info={firstName,lastName,phone,appart_number,parking_number}
        }
        else{
            console.log('not empty')
            info={firstName,lastName,phone,appart_number,parking_number,picture:file}
        }
        dispatch(updateUser(info))
        closeModal()
        console.log('closing')
    }


    return (
        <Modal visible={show}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity>
                            <Icon name='close' size={24} onPress={closeModal} style={{...styles.modalToggle,...styles.modalClose}} />
                        </TouchableOpacity>
                        <View style={globalStyles.container}>
                            <ScrollView>
                                <TextInput style={globalStyles.input} placeholder='First Name' value={firstName} onChangeText={(val)=>setFirstName(val)}  />
                                <TextInput style={globalStyles.input} placeholder='Last Name' value={lastName} onChangeText={(val)=>setLastName(val)} />
                                <TextInput keyboardType="numeric" style={globalStyles.input} placeholder='Appartment Number' value={appart_number!==null ? appart_number.toString():appart_number} onChangeText={(val)=>setAppartNumber(val)} />
                                <TextInput keyboardType="numeric" style={globalStyles.input} placeholder='Parking Number' value={parking_number!==null ? parking_number.toString():parking_number} onChangeText={(val)=>setParkingNumber(val)} />
                                <TextInput keyboardType="numeric" style={globalStyles.input} placeholder='Phone' value={phone!==null ? phone.toString():phone} onChangeText={(val)=>setPhone(val)} />

                                <TouchableOpacity style={{backgroundColor:'green',margin:10,padding:10}}
                                onPress={myfun}>
                                    <Text style={{color:'#fff'}}>Select Image</Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text>Upload</Text>
                                </TouchableOpacity>
                                <Button text='Edit' onPress={onSubmit} />
                            </ScrollView>
                        </View>
                    </View>
            </TouchableWithoutFeedback>
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
    tagContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    inputTag:{
        width:200
    },
    tag:{
        marginLeft:12,
        borderWidth:1,
        borderRadius:10,
        padding:8,
        marginBottom:10
    },
    tags:{
        flexDirection:'row',
        marginBottom:15,
        flexWrap: 'wrap',
        justifyContent:'flex-start'
    }
})


export default EditArticle;