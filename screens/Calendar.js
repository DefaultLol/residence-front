import React,{useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import {Agenda} from 'react-native-calendars'
import {Card, Caption} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux'
import { getEvents } from '../actions/calendarActions';
import UserAvatar from 'react-native-user-avatar';
import {IMAGE_URL} from '../shared/global'

function Calendar() {
  const dispatch = useDispatch()
  const events = useSelector(state => state.calendar.events)
  const firstDate = useSelector(state => state.calendar.firstDate)
  
  useEffect(() => {
    dispatch(getEvents())
    console.log(events)
  }, [])

    const renderItem = (item) => {
        return (
          <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
            <Card>
              <Card.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    {item.tags.map(tag=>(
                      <Caption>{`#${tag.name} `}</Caption>
                    ))}
                  </View>
                  {item.user.avatar===null ? <UserAvatar size={40} name={`${item.user.firstName} ${item.user.lastName}`} />:
                    <UserAvatar size={40} name="Avishay Bar" src={`${IMAGE_URL}/${item.user.avatar}`} />}
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        );
    };
    return (
        <View style={{flex:1}}>
            <Agenda
                items={events}
                loadItemsForMonth={(month) => {console.log('trigger items loading')}}
                selected={firstDate}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default Calendar;
