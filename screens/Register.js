import React,{useState,useEffect} from 'react'
import { View, Text, TouchableOpacity, TextInput,Platform,StyleSheet ,StatusBar,Alert,ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {register} from '../actions/authActions'
import {Formik} from 'formik'
import {useSelector} from 'react-redux'
import registerSchema from '../schema/registerSchema'

export default function Register({navigation}) {
    const dispatch=useDispatch()
    const [secure, setSecure] = useState(true)
    const auth = useSelector(state => state.auth)

    const { colors } = useTheme();
    return (
        <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Sign Up!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Formik 
                initialValues={{firstName:'',lastName:'',phone:'',email:'',phone:'',appart_number:'',parking_number:'',password:'',confirmPass:''}}
                validationSchema={registerSchema}
                onSubmit={(values,actions)=>{
                    console.log(values)
                    dispatch(register(values))
                    setTimeout(()=>{
                        navigation.navigate('Login')
                    },500)
                }}
            >
                {(props)=>(
                    <ScrollView>
                        <Text style={{...styles.errorMsg,textAlign:'center'}}>{auth.error}</Text>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>First Name</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                placeholder="First Name"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={props.handleChange('firstName')}
                                value={props.values.firstName}
                                onBlur={props.handleBlur('firstName')}
                            />
                        </View>
                        {props.errors.firstName && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.firstName && props.errors.firstName}</Text>
                        </Animatable.View>}
                        {/*phone*/ }
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Last Name</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                placeholder="Last Name"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={props.handleChange('lastName')}
                                value={props.values.lastName}
                                onBlur={props.handleBlur('lastName')}
                            />
                        </View>
                        {props.errors.lastName && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.lastName && props.errors.lastName}</Text>
                        </Animatable.View>}
                        {/*email*/ }
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Email</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                placeholder="Email"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                            />
                        </View>
                        {props.errors.email && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.email && props.errors.email}</Text>
                        </Animatable.View>}
                        {/*phone*/ }
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Phone</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                placeholder="Phone"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                keyboardType="numeric"
                                onChangeText={props.handleChange('phone')}
                                value={props.values.phone}
                                onBlur={props.handleBlur('phone')}
                            />
                        </View>
                        {props.errors.phone && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.phone && props.errors.phone}</Text>
                        </Animatable.View>}
                        {/*appart*/ }
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Appartment Number</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                placeholder="Appartment Number"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                keyboardType="numeric"
                                onChangeText={props.handleChange('appart_number')}
                                value={props.values.appart_number}
                                onBlur={props.handleBlur('appart_number')}
                            />
                        </View>
                        {props.errors.appart_number && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.appart_number && props.errors.appart_number}</Text>
                        </Animatable.View>}
                        {/*parking*/ }
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Parking Number</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                placeholder="Parking Number"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                keyboardType="numeric"
                                onChangeText={props.handleChange('parking_number')}
                                value={props.values.parking_number}
                                onBlur={props.handleBlur('parking_number')}
                            />
                        </View>
                        {props.errors.parking_number && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.parking_number && props.errors.parking_number}</Text>
                        </Animatable.View>}
                        {/*password*/ }
                        <Text style={[styles.text_footer, {
                            color: colors.text,
                        }]}>Password</Text>
                        <View style={styles.action}>
                            <Feather 
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                secureTextEntry={secure}
                                placeholder="Your Password"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                            />
                            <TouchableOpacity onPress={()=>setSecure(!secure)}
                            >
                                {secure ? <Feather 
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />:<Feather 
                                name="eye"
                                color="#009387"
                                size={20}
                            />}
                            </TouchableOpacity>
                        </View>
                        {props.errors.password && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.password && props.errors.password}</Text>
                        </Animatable.View>}
                        {/*confirm password*/ }
                        <Text style={[styles.text_footer, {
                            color: colors.text,
                        }]}>Confirm Password</Text>
                        <View style={styles.action}>
                            <Feather 
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput 
                                secureTextEntry={secure}
                                placeholder="Confirm Password"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={props.handleChange('confirmPass')}
                                value={props.values.confirmPass}
                                onBlur={props.handleBlur('confirmPass')}
                            />
                        </View>
                        {props.errors.confirmPass && <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.touched.confirmPass && props.errors.confirmPass}</Text>
                        </Animatable.View>}
                        {!auth.loading ? 
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                            >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color:'#fff'
                                }]}
                                    onPress={props.handleSubmit}
                                >Sign Up</Text>
                            </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={[styles.signIn, {
                                    borderColor: '#009387',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                            >
                                <Text onPress={()=>navigation.navigate('Login')} style={[styles.textSign, {
                                    color: '#009387'
                                }]}>Sign In</Text>
                            </TouchableOpacity>
                        </View>:<ActivityIndicator size={25} color="green" />}
                    </ScrollView>
                )}
            </Formik>
            
        </Animatable.View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginTop:-9,
        marginBottom:8
    },
    button: {
        alignItems: 'center',
        marginTop: 25
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
