import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import { Caption } from 'react-native-paper'
import {globalStyles} from '../shared/global'
import Card from '../shared/Card'
import moment from 'moment'
import UserAvatar from 'react-native-user-avatar';
import {IMAGE_URL} from '../shared/global'
import { ScrollView } from 'react-native-gesture-handler'

function DetailsArticle({route,navigation}) {
    const [article, setArticle] = useState(route.params)
    useEffect(() => {
        console.log(article.tags)
    }, [])
    return (
        <View style={{...globalStyles.container,...styles.container}}>
            <View style={styles.picture}>
                <UserAvatar size={70} name="Avishay Bar" src={`${IMAGE_URL}/${article.picture}`} />
            </View>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.creation}>
                <Caption>{'Created '} 
                    <Text style={{fontWeight:'bold'}}>
                        {moment(article.created_at).fromNow()} 
                    </Text>
                    {' by'} <Text style={{fontWeight:'bold'}}>
                            {`${article.user.firstName} ${article.user.lastName}` }
                        </Text>
                </Caption>
            </View>
            <View style={styles.tags}>
                {article.tags.map((doc)=>(
                    <Caption style={styles.tag}>{`#${doc.name}`}</Caption>
                ))}
            </View>
            <ScrollView>
                <Card>
                    <View>
                        <Text style={styles.cardTitle}>Content</Text>
                        <Text style={styles.cardContent}>{article.content}</Text>
                    </View>
                </Card>
                {article.category.name === 'Event' &&<Card>
                    <View>
                        <Text style={styles.cardTitle}>Event Date</Text>
                        <Text style={styles.cardContent}>{article.creation_date}</Text>
                    </View>
                </Card>}
                <Card>
                    <View>
                        <Text style={styles.cardTitle}>Category</Text>
                        <Text style={styles.cardContent}>{article.category.name}</Text>
                    </View>
                </Card>
                <Card>
                    <View>
                        <Text style={styles.cardTitle}>Description</Text>
                        <Text style={styles.cardContent}>{article.description}</Text>
                    </View>
                </Card>
                <Card>
                    <View>
                        <Text style={styles.cardTitle}>Position</Text>
                        <Text style={styles.cardContent}>{article.position}</Text>
                    </View>
                </Card>
                <Card>
                    <View>
                        <Text style={styles.cardTitle}>Keyword</Text>
                        <Text style={styles.cardContent}>{article.keywoard}</Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18
    },
    creation:{
        alignItems:'center',
        marginVertical:5
    },
    card:{
        minHeight:130,
        minWidth:100,
        maxWidth:100,
        justifyContent:'center',
        alignItems:'center'
    },
    cardTitle:{
        fontWeight:'bold',
        textAlign:'center'
    },
    cardContent:{
        marginVertical:8,
        textAlign:'center'
    },
    tags:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:15
    },
    tag:{
        marginHorizontal:5
    },
    picture:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:8
    }
})

export default DetailsArticle;

