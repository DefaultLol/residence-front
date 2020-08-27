import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Receiver({message}) {
    return (
        <View style={styles.container}>
            <Text style={{color:'black'}}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-start',
        backgroundColor:'#b1b1b1',
        padding:10,
        borderTopRightRadius:14,
        borderTopLeftRadius:14,
        borderBottomRightRadius:14,
        marginVertical:5,
        marginLeft:10,
        marginRight:150,
        maxWidth:200
    }
})

export default Receiver;
