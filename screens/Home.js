import React,{useState,useEffect,useRef} from 'react'
import { DevSettings,StyleSheet, Text, View,FlatList,ActivityIndicator } from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import { globalStyles, IMAGE_URL } from '../shared/global'
import Icon from 'react-native-vector-icons/AntDesign'; 
import { TouchableOpacity } from 'react-native-gesture-handler'
import {getArticles,deleteArticle,like,dislike} from '../actions/articleActions';
import Card from '../shared/Card';
import * as Animatable from 'react-native-animatable';
import AddArticle from '../modals/AddArticle';
import EditArticle from '../modals/EditArticle';
import Comment from '../modals/Comment';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import {Caption} from 'react-native-paper'
import { getComments } from '../actions/commentActions';
import sendNotif from '../shared/NotifConf'
import Pusher from 'pusher-js/react-native';

function Home({navigation}) {
    const dispatch = useDispatch()
    const [refreshing,setRefreshing]=useState(false)
    const [id, setId] = useState(null)
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showComment,setShowComment]=useState(false)
    const user = useSelector(state => state.auth.user)
    const [article, setArticle] = useState({})
    const articles = useSelector(state => state.articles.articles)
    const loading = useSelector(state => state.articles.loading)
    const firstLoad = useRef(false);

    useEffect(() => {
        console.log(firstLoad)
        if(!firstLoad.current){
            console.log('testing')
            Pusher.logToConsole = true;

            var pusher = new Pusher('52bef6685fa7fd501300', {
                cluster: 'eu'
            });
            var channel = pusher.subscribe(`notif-channel-${user.id}`);
            channel.bind('notif-event', function(data) {
                console.log('data',data)
                sendNotif(data.title,data.message)
            });
            firstLoad.current=true;
        }

        
        dispatch(getArticles())
    },[])
    const closeAddModal=()=>{
        setShowAdd(false)
        dispatch(getArticles())
    }
    const closeEditModal=()=>{
        setShowEdit(false)
        dispatch(getArticles())
    }
    const closeCommentModal=()=>{
        setShowComment(false)
    }

    const handleRefresh=()=>{
        setRefreshing(true)
        dispatch(getArticles())
        setRefreshing(false)
    }

    const editArticle=(id)=>{
        console.log(articles.find(doc=>doc.id===id))
        setArticle(articles.find(doc=>doc.id===id))
        setShowEdit(true)

    }
    //return if the article is liked or disliked or none of them
    const checkLike=(data,article,user)=>{
        let info=data.filter(doc=>{
            return doc.user_id===user && doc.article_id===article;
        })
        if(info.length===0){
            return null
        }
        else{
            if(info[0].liked){
                return true
            }
            return false;
        }
    }
    return (
        <View style={globalStyles.container}>
            {loading && <ActivityIndicator size="large" color="green" />}
            <AddArticle show={showAdd} closeModal={closeAddModal} />
            <EditArticle show={showEdit} closeModal={closeEditModal} body={article} />
            <Comment show={showComment} closeModal={closeCommentModal} id={id} navigation={navigation} />
            {(user.role==='super-admin' || user.role==='admin') && 
                <TouchableOpacity style={styles.plus}>
                    <Icon name="pluscircleo" onPress={()=>setShowAdd(true)} size={25} />
                </TouchableOpacity>}
            <FlatList
                refreshing={refreshing}
                onRefresh={handleRefresh}
                keyExtractor={(item, index) => item.id}
                style={styles.list}
                data={articles}
                renderItem={({item})=>(
                    <Animatable.View animation="fadeInLeft" duration={750}>
                    <Card>
                        <Animatable.View>
                            <View style={styles.header}>
                                <View style={styles.leftHeader}>
                                    {item.user.avatar===null ? <UserAvatar size={40} name={`${item.user.firstName} ${item.user.lastName}`} />:
                                        <UserAvatar size={40} name="Avishay Bar" src={`${IMAGE_URL}/${item.user.avatar}`} />}
                                    <View style={styles.headerInfo}>
                                        <TouchableOpacity onPress={()=>navigation.navigate('ForeignProfile',item.user)}>
                                            <Text style={styles.username}>{`${item.user.firstName} ${item.user.lastName}`}</Text>
                                        </TouchableOpacity>
                                        <Caption>{moment(item.created_at).fromNow()}</Caption>
                                    </View>
                                </View>
                                {(user.role==='super-admin' || user.id===item.user_id) && 
                                        <View style={styles.rightHeader}>
                                            <TouchableOpacity style={styles.plus}>
                                                <Icon color="green" style={styles.actionIcon} onPress={()=>editArticle(item.id) } name="edit" size={19} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.plus}>
                                                <Icon color="red" name="delete" onPress={()=>dispatch(deleteArticle(item.id))} size={19} />
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                            <TouchableOpacity onPress={()=>navigation.navigate('Details',item)}>
                                <View style={styles.info}>
                                    <View style={styles.left}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.desc}>{item.description}</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <UserAvatar size={60} name="Avishay Bar" src={`${IMAGE_URL}/${item.picture}`} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <View style={styles.footer}>
                            <View style={styles.like}>
                                <TouchableOpacity onPress={()=>dispatch(like(item.id))} style={styles.liking}>
                                    {(checkLike(item.likes,item.id,user.id) === null || checkLike(item.likes,item.id,user.id)===false)
                                    && <Icon name="like2" size={25} color="#D3D3D3" />}
                                    {checkLike(item.likes,item.id,user.id) === true && <Icon name="like1" size={25} color="#87CEFA" />}
                                    <Caption style={styles.count}>{item.likes_count}</Caption>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dislike} onPress={()=>dispatch(dislike(item.id))} style={styles.disliking}>
                                    {(checkLike(item.likes,item.id,user.id) === null || checkLike(item.likes,item.id,user.id)===true)
                                    && <Icon name="dislike2" size={25} color="#D3D3D3" />}
                                    {checkLike(item.likes,item.id,user.id) === false && <Icon name="dislike1" size={25} color="#87CEFA" />}
                                    <Caption style={styles.count}>{item.dislikes_count}</Caption>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.comment}>
                                <TouchableOpacity onPress={()=>{setId(item.id); dispatch(getComments(item.id)); setShowComment(true)}}>
                                    <Caption>Comments</Caption>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                    </Animatable.View>
                )}
            >

                </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    plus:{
        alignItems:'center'
    },
    list:{
        marginTop:15
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    actionIcon:{
        paddingHorizontal:10
    },
    leftHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:5,
        marginLeft:-5
    },
    rightHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:5,
        marginLeft:-5,
    },
    headerLogo:{
        width:30,
        height:30
    },
    info:{
        paddingTop:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    logo:{
        width:60,
        height:60,
        borderRadius:80
    },
    username:{
        fontWeight:"bold",
        fontSize:12,
        marginTop:6

    },
    headerInfo:{
        flexDirection:'column',
        alignItems:'center',
        marginLeft:4
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
        paddingBottom:5,
    },
    desc:{
        fontSize:13,
        paddingBottom:8
    },
    like:{
        padding:4,
        flexDirection:'row',
        alignItems:'center'
    },
    dislike:{
        marginLeft:15,
        marginTop:5
    },
    footer:{
        marginTop:8,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
    },
    comment:{
        marginRight:5
    },
    liking:{
        flexDirection:'row',
        alignItems:'center'
    },
    disliking:{
        flexDirection:'row',
        alignItems:'center'
    },
    count:{
        marginLeft:5,
        marginRight:15
    }
})

export default Home;

