// import axios from 'axios';
// import configParams from '../../application/config/constants';

const namespace = 'FETCH_PDF';
export const FETCH_PDF = `FETCH_PDF_${namespace}`;
export const CLEAR_PDF = `CLEAR_PDF_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_PDF = `STATIC_ERROR_PDF_${namespace}`;

export function fetchPdf(uid) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(isLoading(false));
        }, 400);
        // axios.get(`${configParams.API_URL}/pdf/pdf/${uid}`)
        // axios.get(`${configParams.API_URL}/pdf/pdf/`)
        //     .then((response) => {
        //         dispatch({
        //             type: FETCH_PDF,
        //             payload: response.data.documents
        //         });
        //         setTimeout(() => {
        //             dispatch(isLoading(false));
        //         }, 100);
        //     }).catch((error) => {
        //         setTimeout(() => {
        //             dispatch(isLoading(false));
        //         }, 100);
        //         let errorMessage = error.success ? error.success.data : error.success;
        //         return dispatch({
        //             type: STATIC_ERROR_PDF,
        //             payload: errorMessage,
        //         });
        //     });
    };
}

export function clearPdf() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_PDF
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