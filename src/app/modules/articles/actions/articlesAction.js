import axios from 'axios';
import { errorHandler } from '../../application/actions/errorHandler';
import configParams from '../../application/config/constants';

const namespace = 'FETCH_ARTICLES';
export const FETCH_ARTICLES = `FETCH_ARTICLES_${namespace}`;
export const CLEAR_ARTICLES = `CLEAR_ARTICLES_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_ARTICLES = `STATIC_ERROR_ARTICLES_${namespace}`;

export function fetchArticles(page) {
    // return function (dispatch) {
    return function (dispatch, getState) {

        const { articlesView: { defaultParams } } = getState();
        // const defaultParams = {}

        if (page > 1) {
            defaultParams.start = (page - 1) * defaultParams.limit;
        } else {
            defaultParams.start = 0;
        }
        const params = {
            params: defaultParams
        }

        dispatch(isLoading(true));
        axios.get(`${configParams.API_URL}/news/news`, params)
            .then((response) => {
                if (response.data && response.data.documents && response.data.documents.length > 0) {
                    dispatch({
                        type: FETCH_ARTICLES,
                        payload: response.data.documents,
                        totalCount: response.data.totalCount
                    });
                    setTimeout(() => {
                        dispatch(isLoading(false));
                    }, 200);
                } else {
                    // dupa
                }
            })
            .catch((error) => {
                dispatch(isLoading(false));
                errorHandler(dispatch, error.response, STATIC_ERROR_ARTICLES);
            });
    }
}

export function clearArticles() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_ARTICLES
        });
    };
}

export function isLoading(isLoading) {
    return function (dispatch) {
        dispatch({
            type: IS_LOADING,
            isLoading: isLoading
        });
    }
}