import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from '../../user/reducers/userReducer';
import codesReducer from '../../codes/reducers/codesReducer';
import codeReducer from '../../code/reducers/codeReducer';
import calendarReducer from '../../fullCalendar/reducers/fullCalendarReducer';
import indexCalendarReducer from '../../fullCalendar/reducers/indexCalendarReducer';
import eventModalReducer from '../../fullCalendar/reducers/eventModalReducer';
import loginReducer from '../../login/reducers/loginReducer';
import logoutReducer from '../../logout/reducers/logoutReducer';
import articlesReducer from '../../articles/reducers/articlesReducer';
import articleReducer from '../../article/reducers/articleReducer';
import smsListReducer from '../../sms/reducers/smsListReducer';
import smsReducer from '../../sms/reducers/smsReducer';
import pdfReducer from '../../pdf/reducers/pdfReducer';
import viewReducer from './viewReducer';
// import userReducer from './userReducer';
// import communicationReducer from './communicationReducer';
// import customerReducer from './customerReducer';
// import contactPageReducer from '../../contactPage/reducers/contactPageReducer';
// import registerReducer from '../../register/reducers/registerReducer';
// import homeReducer from '../../home/reducers/homeReducer';
// import recommendedArticlesReducer from '../recommendedArticles/reducers/recommendedArticlesReducer';
// import reservedSalonVisitsPageReducer from '../../reservedVisitsPage/reducers/reservedSalonVisitsPageReducer';
// import reservedHomeVisitsPageReducer from '../../reservedVisitsPage/reducers/reservedHomeVisitsPageReducer';
// import completedSalonVisitsPageReducer from '../../completedVisitsPage/reducers/completedSalonVisitsPageReducer';
// import completedHomeVisitsPageReducer from '../../completedVisitsPage/reducers/completedHomeVisitsPageReducer';
// import headerReducer from '../header/reducers/headerReducer';
// import lastStepRegistrationPageReducer from '../../lastStepRegistrationPage/reducers/lastStepRegistrationPageReducer';
// import groomerReducer from '../../groomer/reducers/groomerReducer';
// 
// import profilePageReducer from '../../profile/reducers/profilePageReducer';
// import priceListReducer from '../../priceList/reducers/priceListReducer';
// import searchResultsReducer from '../../searchResults/reducers/searchResultsReducer';

const rootReducer = combineReducers({
    form: formReducer,
    authReducer,
    userView: userReducer,
    codesView: codesReducer,
    codeView: codeReducer,
    indexCalendarReducer,
    calendarView: calendarReducer,
    eventModalReducer,
    loginReducer,
    logoutView: logoutReducer,
    pageView: viewReducer,
    articlesView: articlesReducer,
    articleView: articleReducer,
    smsListReducer: smsListReducer,
    smsReducer: smsReducer,
    pdfReducer: pdfReducer
    
    // communication: communicationReducer,
    // customer: customerReducer,
    // view: homeReducer,
    // headerReducer,
    // contactPageReducer,
    // registerReducer,
    // lastStepRegistrationPageReducer,
    // recommendedArticlesReducer,
    // reservedSalonVisitsPageReducer,
    // reservedHomeVisitsPageReducer,
    // completedSalonVisitsPageReducer,
    // completedHomeVisitsPageReducer,
    // groomerReducer,
    // profilePageReducer,
    // priceListReducer,
    // searchResultsReducer,
    // 
});

export default rootReducer;