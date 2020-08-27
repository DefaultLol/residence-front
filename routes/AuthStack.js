import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import SplashScreen from '../screens/SplashScreen'
import Register from '../screens/Register';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="Register" component={Register}/>
    </RootStack.Navigator>
);

export default RootStackScreen;