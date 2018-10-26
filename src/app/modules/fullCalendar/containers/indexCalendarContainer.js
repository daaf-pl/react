import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCalendar, fetchCalendarOwner, fetchVisits, clearCalendarOwner, clearVisits } from '../actions/indexCalendarAction';
import { getEventModalDetails, modifyVisit, saveVisit } from '../actions/eventModalAction';
import Index from '../components/indexCalendarComponent';

class IndexContener extends Component {
    render() {
        // document.getElementsByTagName("META")[4].content="Your description about the page or site here to set dynamically";
        return (
            <Index {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.indexCalendarReducer.isLoading,
    visits: state.indexCalendarReducer.visits,
    getEventModalDetails: state.eventModalReducer.getEventModalDetails,
    initialValues: state.eventModalReducer.getEventModalDetails,
    userInfo: state.authReducer.userInfo,
    ownerCalendar: state.indexCalendarReducer.ownerCalendar
})

const mapDispatchToProps = dispatch => ({
    fetchCalendar: () => {
        dispatch(fetchCalendar());
    },
    fetchCalendarOwner: (uid) => {
        dispatch(fetchCalendarOwner(uid));
    },
    fetchVisits: (uid, val) => {
        // console.log('here');
        dispatch(fetchVisits(uid, val));
    },
    clearCalendarOwner: () => {
        dispatch(clearCalendarOwner());
    },
    clearVisits: () => {
        dispatch(clearVisits());
    },
    modifyVisit: (event) => {
        dispatch(modifyVisit(event));
    },
    saveVisit: (event) => {
        dispatch(saveVisit(event));
    },
    getEventModalDetails: (event) => {
        dispatch(getEventModalDetails(event));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexContener);