import {StyleSheet} from 'react-native'

export const globalStyles=StyleSheet.create({
    container:{
        padding:24,
        flex:1
    },
    paragraph:{
        marginVertical:8,
        lineHeight:20
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        padding:7,
        fontSize:15,
        borderRadius:7,
        marginVertical:10
    },
    errorText:{
        color:'crimson',
        fontWeight:'bold',
        marginBottom:10,
        marginTop:6,
        textAlign:'center'
    }
})

/*export const URL='http://192.168.43.117:8000/api';
export const IMAGE_URL='http://192.168.43.117:8000';*/

export const URL='http://192.168.1.48:8000/api';
export const IMAGE_URL='http://192.168.1.48:8000';
