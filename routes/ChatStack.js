import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ForeignProfil from '../screens/ForeignProfil'
import Chat from '../screens/Chat'
import Messages from '../screens/Messages'

const ChatsStack=createStackNavigator();

const ChatStack=({navigation})=>(
    <ChatsStack.Navigator screenOptions={{
        headerShown:false
    }}>
        <ChatsStack.Screen name="Chat" component={Chat} />
        <ChatsStack.Screen name="Messages" component={Messages} />

    </ChatsStack.Navigator>
)


export default ChatStack;