import { FETCH_PDF, CLEAR_PDF, IS_LOADING } from '../actions/pdfAction';

const INITIAL_STATE = {
    pdf: {},
    isLoading: 'show',
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PDF:
            return { 
                ...state, 
                pdf: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_PDF:
            return {
                ...state,
                pdf: {}
            };
        default:
            return state;
    }
}
