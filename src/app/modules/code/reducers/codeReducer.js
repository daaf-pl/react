import { FETCH_CODE, CLEAR_CODE, IS_LOADING } from '../actions/codeAction';

const INITIAL_STATE = {
    code: {},
    isLoading: false,
    view: 'code'
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CODE:
            return { 
                ...state, 
                code: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_CODE:
            return {
                ...state,
                code: {}
            };
        default:
            return state;
    }
}
