import { FETCH_SMS, CLEAR_SMS, IS_LOADING } from '../actions/smsListAction';

const INITIAL_STATE = {
    smsList: {},
    isLoading: 'show',
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_SMS:
            return { 
                ...state, 
                smsList: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_SMS:
            return {
                ...state,
                smsList: {}
            };
        default:
            return state;
    }
}
