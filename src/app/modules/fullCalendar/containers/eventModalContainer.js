import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearEventModal/*, reserveVisit*/ } from '../actions/eventModalAction';
import { modifyVisit } from '../actions/eventModalAction';
import Modal from '../components/eventModalComponent';

class ModalContainer extends Component {
    render() {
        return (
            <Modal {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    initialValues: state.eventModalReducer.event,
    getEventAllDetails: state.eventModalReducer.getEventModalDetails,
    userInfo: state.authReducer.userInfo,
    ownerId: state.indexCalendarReducer.ownerId
})

const mapDispatchToProps = dispatch => ({
    // reserveVisit: params => {
    //     dispatch(reserveVisit(params));
    // },
    modifyVisit: params => {
        dispatch(modifyVisit(params));
    },
    clearEventModal: () => {
        dispatch(clearEventModal());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);