import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput,Platform,StyleSheet ,StatusBar,Alert,ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';
import {login} from '../actions/authActions'
import {Formik} from 'formik'
import loginSchema from '../schema/loginSchema'

const SignInScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [secure, setSecure] = useState(true)
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Sign In!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Formik
                initialValues={{email:'',password:''}}
                validationSchema={loginSchema}
                onSubmit={(values,actions)=>{
                    setTimeout(() => {
                        console.log(values)
                        dispatch(login(values))
                    },100);
                }}
            >
                {(props)=>(
                    <>
                        <Text style={{...styles.errorMsg,textAlign:'center'}}>{auth.error}</Text>
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
                                placeholder="Your Email"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                                autoCapitalize="none"
                            />
                            {/*<Animatable.View
                                animation="bounceIn"
                            >
                                {props.errors.email==='' && <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />}
                                
                            </Animatable.View>*/}
                        </View>
                        {props.errors.email && <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>{props.touched.email && props.errors.email}</Text>
                        </Animatable.View>}
                        

                        <Text style={[styles.text_footer, {
                            color: colors.text,
                            marginTop: 35
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
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                                autoCapitalize="none"
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
                        <Animatable.View animation="fadeInLeft" duration={300}>
                            <Text style={styles.errorMsg}>{props.touched.password && props.errors.password}</Text>
                        </Animatable.View>
                        

                        <TouchableOpacity>
                            <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
                        </TouchableOpacity>
                        {!auth.loading ? <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                            >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text onPress={props.handleSubmit} style={[styles.textSign, {
                                    color:'#fff'
                                }]}>Sign In</Text>
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
                                <Text onPress={()=>navigation.navigate('Register')} style={[styles.textSign, {
                                    color: '#009387'
                                }]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>:<ActivityIndicator size={25} color="green" />}
                    </>
                )}
            </Formik>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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
    },
    button: {
        alignItems: 'center',
        marginTop: 18
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
  });