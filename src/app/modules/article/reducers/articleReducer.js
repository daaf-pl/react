import { FETCH_ARTICLE, CLEAR_ARTICLE, IS_LOADING } from '../actions/articleAction';

const INITIAL_STATE = {
    article: {},
    isLoading: false,
    view: 'article'
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ARTICLE:
            return { 
                ...state, 
                article: action.payload
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_ARTICLE:
            return {
                ...state,
                article: {}
            };
        default:
            return state;
    }
}
