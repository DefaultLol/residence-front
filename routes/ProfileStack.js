import React from 'react';
import Profile from '../screens/Profile'
import { createStackNavigator } from '@react-navigation/stack';

const ProfilesStack=createStackNavigator();

const ProfileStack=()=>(
    <ProfilesStack.Navigator screenOptions={{
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
        <ProfilesStack.Screen name="Profile" component={Profile} />

    </ProfilesStack.Navigator>
)


export default ProfileStack;