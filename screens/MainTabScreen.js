import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../routes/HomeStack'
import ProfileStack from '../routes/ProfileStack'
import SearchStack from '../routes/SearchStack'
import Notification from '../screens/Notification';
import ChatStack from '../routes/ChatStack';
import ComplaintStack from '../routes/ComplaintStack';
import Calendar from './Calendar';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen=()=>(
    <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
          style={{ backgroundColor: 'tomato' }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarColor:'#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarLabel: 'Profile',
              tabBarColor:'#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarLabel: 'Search',
              tabBarColor:'#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-search" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatStack}
            options={{
              tabBarLabel: 'Chat',
              tabBarColor:'#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="message" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Calendar"
            component={Calendar}
            options={{
              tabBarLabel: 'Calendar',
              tabBarColor:'#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Complaint"
            component={ComplaintStack}
            options={{
              tabBarLabel: 'Complaint',
              tabBarColor:'#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="alert" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
              tabBarLabel: 'Notifications',
              tabBarColor:'#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
              ),
            }}
          />
          
    </Tab.Navigator>
)

export default MainTabScreen;