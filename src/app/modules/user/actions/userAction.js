import axios from 'axios';
import configParams from '../../application/config/constants';

const namespace = 'FETCH_ARTICLE';
export const FETCH_ARTICLE = `FETCH_ARTICLE_${namespace}`;
export const CLEAR_ARTICLE = `CLEAR_ARTICLE_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_ARTICLE = `STATIC_ERROR_ARTICLE_${namespace}`;

export function fetchArticle(uid) {
    return function (dispatch) {
        dispatch(isLoading(true));
        axios.get(`${configParams.API_URL}/news/news/${uid}`)
            .then((response) => {
                dispatch({
                    type: FETCH_ARTICLE,
                    payload: response.data.documents,
                    article: response.data.documents,
                });
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 100);
            }).catch((error) => {
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 100);
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: STATIC_ERROR_ARTICLE,
                    payload: errorMessage,
                });
            });
    };
}

export function clearArticle() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_ARTICLE
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