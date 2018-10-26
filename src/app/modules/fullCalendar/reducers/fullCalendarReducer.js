import { FETCH_CALENDAR, IS_LOADING, CLEAR_CALENDAR } from '../actions/fullCalendarAction';

const INITIAL_STATE = {
    calendar: {},
    isLoading: 'show'
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CALENDAR:
            return { 
                ...state, 
                calendar: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_CALENDAR:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}
