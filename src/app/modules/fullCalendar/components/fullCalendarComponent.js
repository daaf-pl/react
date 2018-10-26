import React, { Component } from 'react';
import jQuery from 'jquery';
import _ from 'lodash';
import moment from 'moment/min/moment.min.js';
import PopUp from '../containers/eventModalContainer';

import 'fullcalendar/dist/fullcalendar.css';
import './calendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/locale/pl.js';

export default class EmployeesCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: this.getParsedEvents(true)
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(event) {
        const { getEventModalDetails } = this.props;
        getEventModalDetails(event);
        this.setState({ showModal: true, initialValues: event });
    }

    handleCloseModal() {
        const { fullCalendar } = this.refs;
        this.setState({ showModal: false });
        jQuery(fullCalendar).fullCalendar('rerenderEvents');
    }

    demoMethod = (value) => {
        // var lang = this.refs.dropdown.value;
        this.props.sendData(value);
    }

    componentDidMount() {
        const { fullCalendar } = this;
        const { modifyVisit, saveVisit, ownerCalendar } = this.props;
        const instance = this;
        console.log('here ', ownerCalendar);

        jQuery(fullCalendar).fullCalendar({
            defaultView: 'agendaThreeDay',
            views: {
                agendaThreeDay: {
                    type: 'agenda',
                    duration: { days: 3 },
                    buttonText: '3 dni',
                    // eventLimit: 2
                }
            },
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'agendaThreeDay,agendaWeek,month'
            },
            events: this.state.events,
            viewRender: function (view, element) {
                // console.log('od: ' + moment(view.start._i).format('YYYY-MM-DD') + ' - do: ' + moment(view.end._i).format('YYYY-MM-DD'));
                if (ownerCalendar.calendarOwnerInfo) {
                    instance.demoMethod(
                        instance.value = {
                            ownerId: ownerCalendar.calendarOwnerInfo.id,
                            start: moment(view.start._i).format('YYYY-MM-DD'),
                            end: moment(view.end._i).format('YYYY-MM-DD')
                        }
                    );
                } else {
                    console.log('dupa');
                }
            },
            select: function (start, end) {
                var eventData;
                eventData = {
                    start: start,
                    end: end,
                    groomer: ownerCalendar.calendarOwnerInfo.id,
                };

                saveVisit(eventData);
                // console.log('here');
                // $(calendar).fullCalendar('rerenderEvents');
                jQuery(fullCalendar).fullCalendar('renderEvent', eventData, true); // stick? = true
                jQuery(fullCalendar).fullCalendar('unselect');
            },
            eventClick: function (event) {
                // console.log(event.editable);
                instance.state.event = event;
                // if (event.editable) {
                instance.handleOpenModal(event);
                // }
            },
            eventDrop: function (event, delta, revertFunc) {
                event.groomerEdited = true;
                // alert(event.title + " was dropped on " + event.start.format());
                // console.log('front', event);
                modifyVisit(event);
                // if (!confirm("Are you sure about this change?")) {
                // revertFunc();
                // }
            },
            eventResize: function (event, delta, revertFunc) {
                // alert(event.title + " end is now " + event.end.format());
                modifyVisit(event);
            },
            editable: true,
            selectable: true,
            scrollTime: '09:00:00',
            minTime: '09:00:00',
            maxTime: '18:00:00',
            contentHeight: 'auto',
        });
    }

    componentWillReceiveProps(nextProps, nextState) {
        const { fullCalendar } = this;
        this.setState({
            events: this.getParsedEvents(true),
        }, () => {
            jQuery(fullCalendar).fullCalendar('removeEvents');
            jQuery(fullCalendar).fullCalendar('addEventSource', this.getParsedEvents(true));
        });
    }

    componentWillUnmount() {
        const { fullCalendar } = this;
        jQuery(fullCalendar).fullCalendar('destroy');
    }

    getParsedEvents = (renderCalendar = false) => {
        const { visits } = this.props;
        if (visits && visits.length > 0) {
            let currentEvents = visits.map((event, index) => {
                return {
                    id: _.get(event, 'id', ''),
                    title: `${this.prepareTitle(_.get(event, 'type', ''), _.get(event, 'user'))}`,
                    start: _.get(event, 'startAt', ''),
                    end: _.get(event, 'endAt', ''),
                    allDay: false,
                    type: _.get(event, 'type', ''),
                    groomer: _.get(event, 'groomer.id', ''),
                    statusInfo: _.get(event, 'status.statusInfo', ''),
                    className: `${this.prepareClass(_.get(event, 'user'), _.get(event, 'type'))}`,
                    dow: [1, 6]
                }
            });
            return currentEvents;
        } else {
            return [];
        }
    }

    prepareClass(user, type) {
        if (!_.isEmpty(user)) { return 'book-unavailable'; }
        if (_.isEmpty(user) && type === 'home') { return 'home-available'; }
        if (_.isEmpty(user) && type === 'salon') { return 'salon-available'; }
        if (_.isEmpty(user) && _.isEmpty(type)) { return 'book-available'; }
    }

    prepareTitle(type, user) {
        if (_.isEmpty(user) && _.isEmpty(type)) { return 'Wizyta niezdefiniowana'; }
        if (_.isEmpty(user) && !_.isEmpty(type) && type === 'salon') { return 'Zarezerwuj wizytę w salonie'; }
        if (_.isEmpty(user) && !_.isEmpty(type) && type === 'home') { return 'Zarezerwuj wizytę w domu'; }
        if (!_.isEmpty(user) && !_.isEmpty(type) && type === 'salon') { return 'Zarezerwowana wizyta w salonie'; }
        if (!_.isEmpty(user) && !_.isEmpty(type) && type === 'home') { return 'Zarezerwowana wizyta w domu'; }
        // return returnedTitle;
    }

    render() {
        const modal = !_.isEmpty(this.props.initialValues) ? <PopUp {...this.props} isOpen={this.state.showModal} clearModal={this.handleCloseModal} /> : null;
        return (
            <div>
                <div ref={(calendar) => { this.fullCalendar = calendar; }} />
                {modal}
            </div>
            // <div ref={(calendar) => { this.fullCalendar = calendar; }} />
        );
    }
}
