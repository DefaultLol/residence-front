import React,{useState,useEffect,useRef} from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import MainTabScreen from './screens/MainTabScreen'
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import RootStackScreen from './routes/AuthStack';
import {loadUser} from './actions/authActions'
import DrawerContent from './screens/DrawerContent'
import Splash from './screens/Splash'
import Pusher from 'pusher-js/react-native';
import sendNotif from './shared/NotifConf'

const Drawer = createDrawerNavigator();


const App= ({navigation}) => {
  console.disableYellowBox = true;
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const first = useRef(true)


  const loadInitialState=async()=>{
    let value=await AsyncStorage.getItem('auth');
    if(value==='true') setAuth(true)
    else setAuth(false)
    return value;
  }

  store.subscribe(()=>{
    let state=store.getState().auth;
    console.log('loading',state.loading)
    if(state.loading){
      setTimeout(()=>{
        setLoading(false)
      },3000)
      return(
        <Splash />
      )
    }

    if(state.auth){
      setAuth(true)
    }
    else{
      if(loadInitialState()==='true'){
        setAuth(true)
      }
      else{
        setAuth(false)
      }

    }
  })

  useEffect(() => {
    store.dispatch(loadUser())
    if(first.current){
      //loadInitialState();
      first.current=false
    }
    console.log(store.getState().auth)
  }, [])

  /*useEffect(() => {
    console.log('id',store.getState().auth.user.id)
    Pusher.logToConsole = true;

    var pusher = new Pusher('52bef6685fa7fd501300', {
      cluster: 'eu'
    });
    var channel = pusher.subscribe(`notif-channel-${store.getState().auth.user.id}`);
    channel.bind('notif-event', function(data) {
      console.log('data',data)
      sendNotif(data.title,data.message)
    });
  }, [])*/

  /*useEffect(() => {
    if(store.getState().auth.user.role==='basic')
    {
      console.log('id',store.getState().auth.user.id)
      Pusher.logToConsole = true;
  
      var pusher = new Pusher('52bef6685fa7fd501300', {
        cluster: 'eu'
      });
      var channel = pusher.subscribe('general-channel');
      channel.bind('general-event', function(data) {
        console.log('data',data)
        sendNotif(data.title,data.message)
      });
    }
  }, [])*/

  if(loading){
    setTimeout(()=>{
      setLoading(false)
    },3000)
    return(
      <Splash />
    )
  }
  return (
    <Provider store={store}>
        <NavigationContainer>
          {auth ? <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeStack" component={MainTabScreen} />
          </Drawer.Navigator>:
          <RootStackScreen />}

        </NavigationContainer>
    </Provider> 
  );
};

const styles = StyleSheet.create({

});

export default App;
