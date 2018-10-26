import axios from 'axios';
import configParams from '../../application/config/constants';

const namespace = 'FETCH_INDEX_CALENDAR';
export const FETCH_VISITS = `FETCH_VISITS_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_FETCH_VISITS = `STATIC_ERROR_FETCH_VISITS_${namespace}`;
export const CLEAR_FETCH_VISITS = `CLEAR_FETCH_VISITS_${namespace}`;
export const FETCH_CALENDAR_OWNER = `FETCH_CALENDAR_OWNER_${namespace}`;
export const STATIC_ERROR_CALENDAR_OWNER = `STATIC_ERROR_CALENDAR_OWNER_${namespace}`;
export const CLEAR_OWNER_CALENDAR = `CLEAR_OWNER_CALENDAR_${namespace}`;

// export function fetchCalendar(uid) {
export function fetchCalendar() {
    return function (dispatch) {
        dispatch(isLoading('show'));
        setTimeout(() => {
            dispatch(isLoading(false));
        }, 400);
    };
}

export function fetchCalendarOwner(uid) {
    return function (dispatch) {
        const params = {
            "short-ver": true
        }
        axios.get(`${configParams.API_URL}/user/profile/${uid}`, params)
            .then((response) => {
                dispatch({
                    type: FETCH_CALENDAR_OWNER,
                    payload: response.data.documents,
                });
            }).catch((error) => {
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: STATIC_ERROR_CALENDAR_OWNER,
                    payload: errorMessage,
                });
            });
    };
}

export function clearCalendarOwner() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_OWNER_CALENDAR
        });
    };
}

export function fetchVisits(uid, val) {
    // console.log(uid);
    return function (dispatch) {
        const params = {
            "uid": uid,
            "range": val
        }
        // console.log(params);
        axios.get(`${configParams.API_URL}/events/events/?uid=${uid}&start=${val.start}&end=${val.end}`, params)
            .then((response) => {
                // console.log(response.data.documents);
                dispatch({
                    type: FETCH_VISITS,
                    ownerId: uid,
                    payload: response.data.documents,
                });
            }).catch((error) => {
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: STATIC_ERROR_FETCH_VISITS,
                    payload: errorMessage,
                });
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

export function clearVisits() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_FETCH_VISITS,
            isLoading: 'show'
        });
    };
}