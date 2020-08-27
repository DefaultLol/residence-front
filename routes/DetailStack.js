import React from 'react';
import DetailsArticle from '../screens/DetailsArticle'
import { createStackNavigator } from '@react-navigation/stack';

const DetailsStack=createStackNavigator();

const DetailStack=()=>(
    <DetailsStack.Navigator screenOptions={{
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
        <DetailsStack.Screen name="Detail" component={DetailsArticle} />

    </DetailsStack.Navigator>
)


export default DetailStack;