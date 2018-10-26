import axios from 'axios';
import configParams from '../../application/config/constants';
import moment from 'moment';

const namespace = 'EVENT_MODAL';
export const GET_EVENT_MODAL_DETAILS = `GET_EVENT_MODAL_DETAILS_${namespace}`;
export const CLEAR_EVENT_MODAL = `CLEAR_EVENT_MODAL_${namespace}`;
export const MODIFY_VISIT = `MODIFY_VISIT_${namespace}`;
export const SAVE_VISIT = `SAVE_VISIT_${namespace}`;
export const MODAL_ERROR = `MODAL_ERROR_${namespace}`;
export const STATIC_ERROR_SAVE_VISIT = `STATIC_ERROR_SAVE_VISITR_${namespace}`;

export function reserveVisit(event) {
    return function (dispatch) {
        console.log('put event', event);
        // axios.get(`${configParams.API_URL}/user/profile/${uid}`)
        //     .then((response) => {
        //         dispatch({
        //             type: FETCH_GROOMER,
        //             payload: response.data.documents,
        //         });
        //     }).catch((error) => {
        //         let errorMessage = error.success ? error.success.data : error.success;
        //         return dispatch({
        //             type: STATIC_ERROR_GROOMER,
        //             payload: errorMessage,
        //         });
        //     });
    };
}

export function modifyVisit(event) {
    return function (dispatch) {
        const params = {
            "startAt": event.start,
            "endAt": event.end,
            "type": event.visitType,
            "groomer": event.groomer,
            "statusInfo": event.statusInfo,
            "user": event.loogedUserId,
            "bookedServices": event.bookedServices,
            "groomerEdited": event.groomerEdited
        }
        // console.log(params);
        axios.put(`${configParams.API_URL}/events/events/${event.id}`, params)
            .then((response) => {
                dispatch({
                    type: MODIFY_VISIT,
                    payload: response.data.documents,
                });
            }).catch((error) => {
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: MODAL_ERROR,
                    payload: errorMessage,
                });
            });
    };
}

export function deleteVisit(event) {
    console.log(event.id);
    return function (dispatch) {
        console.log('del event', event);
        // axios.get(`${configParams.API_URL}/user/profile/${uid}`)
        //     .then((response) => {
        //         dispatch({
        //             type: FETCH_GROOMER,
        //             payload: response.data.documents,
        //         });
        //     }).catch((error) => {
        //         let errorMessage = error.success ? error.success.data : error.success;
        //         return dispatch({
        //             type: STATIC_ERROR_GROOMER,
        //             payload: errorMessage,
        //         });
        //     });
    };
}

export function saveVisit(event) {
    return function (dispatch) {
        // console.log(event);
        const params = {
            "startAt": event.start,
            "endAt": event.end,
            "type": event.type,
            "groomer": event.groomer,
            "statusInfo": 'Opened'
        }
        axios.post(`${configParams.API_URL}/events/events/`, params)
            .then((response) => {
                // console.log(response.data.id);
                dispatch({
                    type: SAVE_VISIT,
                    payload: response.data.id,
                });
            }).catch((error) => {
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: STATIC_ERROR_SAVE_VISIT,
                    payload: errorMessage,
                });
            });
    };
}

export function getEventModalDetails(event) {
    // console.log('here '+event);
    return function (dispatch) {
        dispatch({
            type: GET_EVENT_MODAL_DETAILS,
            payload: prepareDate(event),
            getDateDetails: event
        });
    }
}

export function prepareDate(event) {
    let prepareEvent = {};
    prepareEvent.eventStart = moment(event.start).format('LL') + ', GODZINA ' + moment(event.start).format('hh:mm');

    return prepareEvent;
}

export function clearEventModal() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_EVENT_MODAL
        });
    }
}