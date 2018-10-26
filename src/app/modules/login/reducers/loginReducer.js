import { SET_ERROR, CLEAR_ERROR, CLEAR_IS_LOADING, SHOW_IS_LOADING } from '../actions/loginAction';

const INITIAL_STATE = {
    error: false,
    isLoading: 'show'
};


export default function (state = INITIAL_STATE, action) {
    // let error;
    switch (action.type) {
        case CLEAR_IS_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case SHOW_IS_LOADING:
            return {
                ...state,
                isLoading: 'show'
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: false
            }
        default:
            return state;
    }
}