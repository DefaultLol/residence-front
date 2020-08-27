import React,{useState,useEffect} from 'react'
import { Modal, StyleSheet, View,Text,TouchableWithoutFeedback,Keyboard,ScrollView,TextInput,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'; 
import {globalStyles} from '../shared/global';
import {useDispatch,useSelector} from 'react-redux';
import {Picker} from '@react-native-community/picker';
import {getCategories,addArticle} from '../actions/articleActions'
import Button from '../shared/Button';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'

const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}

function AddArticle({show,closeModal}) {
    const dispatch=useDispatch()
    const categories = useSelector(state => state.articles.categories)
    const [category, setCategory] = useState(null)
    const [title, setTitle] = useState(null)
    const [file,setFile]=useState(null)
    const [description, setDescription] = useState(null)
    const [info, setInfo] = useState(null)
    const [position, setPosition] = useState(null)
    const [keyword, setKeyword] = useState(null)
    const [tags, setTags] = useState([])
    const [tag,setTag]=useState(null)
    const [date, setDate] = useState(null)
    const reset=()=>{
        setCategory(null)
        setTitle(null)
        setFile(null)
        setDescription(null)
        setInfo(null)
        setPosition(null)
        setKeyword(null)
        setTag(null)
        setTags([])
        setDate(null)
    }
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

    useEffect(() => {
        dispatch(getCategories()) 
    },[])

    const addTag=(tag)=>{
        if(tag!==null)
        {
            setTags((prevState)=>(
                [...prevState,tag]
            ))
            setTag(null)
        }
    }

    const deleteTag=(tag)=>{
        setTags((prevState)=>(
            prevState.filter(doc => doc!==tag)
        ))
    }

    const onSubmit=()=>{
        const choosenCat=categories.filter((cat) => cat.name === category);
        let formData=new FormData()
        formData.append('title',title);
        formData.append('description',description);
        formData.append('information',info);
        formData.append('keywoard',keyword);
        formData.append('position',position);
        formData.append('category_id',choosenCat[0].id);
        formData.append('title',title);
        formData.append('tags',JSON.stringify(tags));
        formData.append('picture',file);
        formData.append('creation_date',date)
        dispatch(addArticle(formData))
        close();
    }

    const close=()=>{
        closeModal()
        reset()
    }

    return (
        <Modal visible={show}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity>
                            <Icon name='close' size={24} onPress={close} style={{...styles.modalToggle,...styles.modalClose}} />
                        </TouchableOpacity>
                        <View style={globalStyles.container}>
                            <ScrollView>
                                <TextInput style={globalStyles.input} placeholder='title' onChangeText={(val)=>setTitle(val)}  />
                                <TextInput style={globalStyles.input} placeholder='description' onChangeText={(val)=>setDescription(val)} />
                                <TextInput style={globalStyles.input} placeholder='info' onChangeText={(val)=>setInfo(val)} />
                                <TextInput style={globalStyles.input} placeholder='position' onChangeText={(val)=>setPosition(val)} />
                                <TextInput style={globalStyles.input} placeholder='keyword' onChangeText={(val)=>setKeyword(val)} />
                                <Picker
                                    selectedValue={category}
                                    style={{height: 50, width: 330}}
                                    onValueChange={(itemValue, itemIndex) =>{
                                        if(itemIndex!==0) setCategory(itemValue)
                                    }      
                                }>
                                    <Picker.Item label="Select a category" value="Select a category" />
                                    {categories.map(cat=>(
                                        <Picker.Item label={cat.name} value={cat.name} />
                                    ))}
                                </Picker>
                                {category==='Event' && <DatePicker
                                    style={{width: 300,borderColor:'#ddd'}}
                                    date={date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => setDate(date)}
                                />}
                                <View style={styles.tagContainer}>
                                    <TextInput style={{...globalStyles.input,...styles.inputTag}} placeholder="Tag" value={tag} onChangeText={(val) => setTag(val)} />
                                    <TouchableOpacity>
                                        <Icon name="pluscircleo" onPress={() => addTag(tag) } style={{marginLeft:15}} size={25} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.tags}>
                                    {tags.map(tag=>(
                                        <TouchableOpacity>
                                            <Text style={styles.tag} onPress={() => deleteTag(tag)}>{tag}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TouchableOpacity style={{backgroundColor:'#ddd',marginBottom:15,padding:10}}
                                onPress={myfun}>
                                    <Text style={{color:'black'}}>{file!==null ? "Image selected":"Select an image" }</Text>
                                </TouchableOpacity>
                                <Button text='Add' onPress={onSubmit} />
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


export default AddArticle;