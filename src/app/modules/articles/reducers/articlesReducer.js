import { FETCH_ARTICLES, CLEAR_ARTICLES, IS_LOADING } from '../actions/articlesAction';

const INITIAL_STATE = {
    articles: {},
    isLoading: false,
    view: 'articles',
    defaultParams: {
        limit: 3,
        'visible': true,
        select: 'title,shortDescription,friendlyUrl,createdAt',
        'sort[createdAt]': 'desc',
        'sort[title]': 'desc'
    },
    totalCount: null
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ARTICLES:
            return {
                ...state, 
                articles: [...action.payload],
                totalCount: action.totalCount
                // articles: action.articles
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case CLEAR_ARTICLES:
            return {
                ...state,
                articles: {}
            };
        default:
            return state;
    }
}
