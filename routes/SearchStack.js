import React from 'react';
import Search from '../screens/Search'
import DetailsArticle from '../screens/DetailsArticle'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ForeignProfil from '../screens/ForeignProfil'

const SearchsStack=createStackNavigator();

const SearchStack=({navigation})=>(
    <SearchsStack.Navigator>
        <SearchsStack.Screen name="Search" component={Search} options={{
            headerShown:false
        }} />
        <SearchsStack.Screen name="ForeignProfile" component={ForeignProfil} options={{
            title:'Profile',
            headerStyle:{
                backgroundColor:'#009387'
            },
            headerTintColor:'#fff',
        }} />

    </SearchsStack.Navigator>
)


export default SearchStack;