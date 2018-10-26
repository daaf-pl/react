import { GET_EVENT_MODAL_DETAILS, MODIFY_VISIT, CLEAR_EVENT_MODAL } from '../actions/eventModalAction';

const INITIAL_STATE = {
    event: {},
    getEventModalDetails: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_EVENT_MODAL_DETAILS:
            return {
                ...state,
                event: { title: action.payload.eventStart },
                getEventModalDetails: action.getDateDetails
            };
        case MODIFY_VISIT:
            return { 
                ...state, 
                visit: action.payload
            };
        case CLEAR_EVENT_MODAL:
            return {
                ...state,
                event: {},
                getEventModalDetails: {}
            };
        default:
            return state;
    }
}
