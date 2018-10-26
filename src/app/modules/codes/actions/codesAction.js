import axios from 'axios';
import configParams from '../../application/config/constants';

const namespace = 'FETCH_CODES';
export const FETCH_CODES = `FETCH_CODES_${namespace}`;
export const CLEAR_CODES = `CLEAR_CODES_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_CODES = `STATIC_ERROR_CODE_${namespace}`;

export function fetchCodes() {
    return function (dispatch) {
        dispatch(isLoading(true));
        axios.get(`${configParams.API_URL}/codes/codes/`)
            .then((response) => {
                dispatch({
                    type: FETCH_CODES,
                    payload: response.data.documents,
                    codes: response.data.documents,
                });
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 400);
            }).catch((error) => {
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 400);
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: STATIC_ERROR_CODES,
                    payload: errorMessage,
                });
            });
    };
}

export function clearCodes() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_CODES
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