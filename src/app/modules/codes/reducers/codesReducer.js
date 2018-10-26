import { FETCH_CODES, CLEAR_CODES, IS_LOADING } from '../actions/codesAction';

const INITIAL_STATE = {
    codes: {},
    isLoading: false,
    view: 'codes'
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CODES:
            return { 
                ...state, 
                codes: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_CODES:
            return {
                ...state,
                codes: {}
            };
        default:
            return state;
    }
}
