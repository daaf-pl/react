import axios from 'axios';
import configParams from '../../application/config/constants';

const namespace = 'FETCH_SMS';
export const FETCH_SMS = `FETCH_SMS_${namespace}`;
export const CLEAR_SMS = `CLEAR_SMS_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_SMS = `STATIC_ERROR_SMS_${namespace}`;

export function fetchSmsList(uid) {
    return function (dispatch) {
        // setTimeout(() => {
        //     dispatch(isLoading(false));
        // }, 400);
        // axios.get(`${configParams.API_URL}/sms/sms/${uid}`)
        axios.get(`${configParams.API_URL}/sms/sms/`)
            .then((response) => {
                dispatch({
                    type: FETCH_SMS,
                    payload: response.data.documents
                });
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 200);
            }).catch((error) => {
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 200);
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: STATIC_ERROR_SMS,
                    payload: errorMessage,
                });
            });
    };
}

export function clearSmsList() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_SMS
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