import React from 'react';
import Home from '../screens/Home'
import DetailsArticle from '../screens/DetailsArticle'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ForeignProfil from '../screens/ForeignProfil'

const HomesStack=createStackNavigator();

const HomeStack=({navigation})=>(
    <HomesStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor:'#009387'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:'bold',
            alignSelf:'center',
            fontSize:18
        }
    }}>
        <HomesStack.Screen name="Home" component={Home} options={{
            title:'Overview',
            /*headerLeft:()=>(
                <Icon.Button name="align-justify" size={16} backgroundColor="#009387" onPress={()=>navigation.openDrawer()}></Icon.Button>
            )*/
        }} />
        <HomesStack.Screen name="Details" component={DetailsArticle} options={{
            title:'Details',
            /*headerLeft:()=>(
                <Icon.Button name="align-justify" size={16} backgroundColor="#009387" onPress={()=>navigation.openDrawer()}></Icon.Button>
            )*/
        }} />
        <HomesStack.Screen name="ForeignProfile" component={ForeignProfil} options={{
            title:'Profile',
            /*headerLeft:()=>(
                <Icon.Button name="align-justify" size={16} backgroundColor="#009387" onPress={()=>navigation.openDrawer()}></Icon.Button>
            )*/
        }} />

    </HomesStack.Navigator>
)


export default HomeStack;