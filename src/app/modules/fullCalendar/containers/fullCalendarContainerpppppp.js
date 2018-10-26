import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCalendar, clearCalendar } from '../actions/fullCalendarAction';
import { getEventModalDetails } from '../actions/eventModalAction';
import Calendar from '../components/fullCalendarComponent';
// import FullCalendar from '../components/fullCalendarComponent-old';

class CalendarContener extends Component {
    render() {
        document.getElementsByTagName("META")[4].content="Your description about the page or site here to set dynamically";
        return (
            <Calendar {...this.props} />
            // <FullCalendar {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    calendar: state.calendarView.calendar,
    isLoading: state.calendarView.isLoading,
    getEventModalDetails: state.eventModalReducer.getEventModalDetails,
    editableVisits: state.calendarView.visits
})

const mapDispatchToProps = dispatch => ({
    fetchCalendar: (calendarView) => {
        dispatch(fetchCalendar(calendarView));
    },
    clearCalendar: () => {
        dispatch(clearCalendar());
    },
    getEventModalDetails: (event) => {
        console.log('Container here');
        dispatch(getEventModalDetails(event));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContener);