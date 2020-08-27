import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Complaints from '../screens/Complaints'
import AddComplaints from '../screens/AddComplaints'
import ComplaintDetail from '../screens/ComplaintDetail'
import EditComplaint from '../screens/EditComplaint'

const ComplaintsStack=createStackNavigator();

const ComplaintStack=({navigation})=>(
    <ComplaintsStack.Navigator screenOptions={{
        headerShown:false
    }}>
        <ComplaintsStack.Screen name="Complaints" component={Complaints} />
        <ComplaintsStack.Screen name="AddComplaints" component={AddComplaints} />
        <ComplaintsStack.Screen name="ComplaintDetail" component={ComplaintDetail} />
        <ComplaintsStack.Screen name="EditComplaint" component={EditComplaint} />
    </ComplaintsStack.Navigator>
)


export default ComplaintStack;