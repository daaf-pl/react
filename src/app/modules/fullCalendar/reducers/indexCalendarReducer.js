import { FETCH_VISITS, CLEAR_FETCH_VISITS, IS_LOADING, FETCH_CALENDAR_OWNER, CLEAR_OWNER_CALENDAR } from '../actions/indexCalendarAction';

const INITIAL_STATE = {
    isLoading: 'show',
    visits: [],
    ownerCalendar: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CALENDAR_OWNER:
            return { 
                ...state, 
                ownerCalendar: action.payload
            };
        case FETCH_VISITS:
            return {
                ...state,
                visits: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_OWNER_CALENDAR:
            return {
                ...state,
                ownerCalendar: {}
            };
        case CLEAR_FETCH_VISITS:
            return {
                ...state,
                isLoading: action.isLoading,
                visits: []
            };
        default:
            return state;
    }
}