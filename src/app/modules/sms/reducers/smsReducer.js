import { FETCH_SMS, CLEAR_SMS, IS_LOADING } from '../actions/smsAction';

const INITIAL_STATE = {
    sms: {},
    isLoading: 'show',
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_SMS:
            return { 
                ...state, 
                sms: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_SMS:
            return {
                ...state,
                sms: {}
            };
        default:
            return state;
    }
}
