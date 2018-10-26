import { CLEAR_LOGOUT, IS_LOADING } from '../actions/logoutAction';

const INITIAL_STATE = {
    isAuth: true,
    isLoading: 'show'
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_LOGOUT:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
