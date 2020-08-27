import {combineReducers} from 'redux';
import articleReducer from './articleReducer';
import AuthReducer from './authReducer'
import profileReducer from './profileReducer'
import notificationReducer from './notificationReducer'
import MessageReducer from './messageReducer';
import ComplaintReducer from './complaintReducer';
import CommentReducer from './commentReducer'
import CalendarRedcuer from './calendarReducer'


export default combineReducers({
    auth:AuthReducer,
    articles:articleReducer,
    profile:profileReducer,
    notification:notificationReducer,
    message:MessageReducer,
    complaint:ComplaintReducer,
    comment:CommentReducer,
    calendar:CalendarRedcuer
});