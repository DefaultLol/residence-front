import React from 'react';
import Calendar from '../screens/Calendar'
import { createStackNavigator } from '@react-navigation/stack';


const CalendarsStack=createStackNavigator();

const CalendarStack=({navigation})=>(
    <CalendarsStack.Navigator screenOptions={{
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
        <CalendarsStack.Screen name="Calendar" component={Calendar} options={{
            title:'Calendar',
            /*headerLeft:()=>(
                <Icon.Button name="align-justify" size={16} backgroundColor="#009387" onPress={()=>navigation.openDrawer()}></Icon.Button>
            )*/
        }} />

    </CalendarsStack.Navigator>
)


export default CalendarStack;