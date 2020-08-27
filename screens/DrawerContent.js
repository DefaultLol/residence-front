import React,{useState,useEffect} from 'react'
import {View,StyleSheet} from 'react-native'
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch} from 'react-native-paper';
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../actions/authActions'
import {useDispatch} from 'react-redux'
import {IMAGE_URL} from '../shared/global'
import UserAvatar from 'react-native-user-avatar';
import {useSelector} from 'react-redux'
import { getArticles } from '../actions/articleActions';

const DrawerContent=(props)=>{
    const dispatch=useDispatch()
    const user = useSelector(state => state.auth.user)
    const [logout1, setLogout1] = useState(false)
    const paperTheme = useTheme();

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            {user.avatar===null ? <UserAvatar size={50} name={`${user.firstName} ${user.lastName}`} />:
                                <UserAvatar size={50} name="Avishay Bar" src={`${IMAGE_URL}/${user.avatar}`} />}
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{user.firstName} {user.lastName}</Title>
                                <Caption style={styles.caption}>{user.firstName}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>Role : </Paragraph>
                                <Caption style={styles.caption}>{user.role}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-search" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Search"
                            onPress={() => {props.navigation.navigate('Search')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="chat-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Chat"
                            onPress={() => {props.navigation.navigate('Chat')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Calendar"
                            onPress={() => {props.navigation.navigate('Calendar')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bell-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Notifications"
                            onPress={() => {props.navigation.navigate('Notification')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={()=>{
                        dispatch(logout())
                        /*setTimeout(()=>{
                            dispatch(getArticles())
                        },500)*/
                    }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles=StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})

export default DrawerContent;