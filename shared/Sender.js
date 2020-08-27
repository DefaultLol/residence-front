import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Sender({message}) {
    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-end',
        backgroundColor:'#009387',
        padding:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        marginVertical:5,
        marginLeft:150,
        maxWidth:200
    }
})

export default Sender;
