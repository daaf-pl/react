import React, { Component } from 'react';
// import FullCalendar from 'fullcalendar-reactwrapper';

import $ from 'jquery';
import moment from 'moment/min/moment.min.js';
import _ from 'lodash';

import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/locale/pl.js';

// import Modal from './modalComponent';
import PopUp from '../containers/eventModalContainer';

export default class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: 'show',
            showModal: false,
            initialValues: {},
            event: {},
            events: false,
            eventsLoaded: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleLoadEvents = this.handleLoadEvents.bind(this);
    }

    handleOpenModal(event) {
        const { getEventModalDetails } = this.props;
        getEventModalDetails(event);
        // console.log(event);
        // this.setState({  });
        this.setState({ showModal: true, initialValues: event });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleLoadEvents() {
        this.setState({ eventsLoaded: true });
    }

    componentDidMount() {
        const instance = this;
        const { modifyVisit, saveVisit, userInfo } = this.props;
        // console.log(userInfo);
        const { calendar } = this.refs;

        $(calendar).fullCalendar({
            defaultView: 'agendaThreeDay',
            views: {
                agendaThreeDay: {
                    type: 'agenda',
                    duration: { days: 3 },
                    buttonText: '3 dni',

                }
            },
            header: {
                left: 'prev,next today',
                right: 'agendaThreeDay,agendaWeek,month'
            },
            minTime: '08:00:00',
            maxTime: '21:00:00',
            // viewRender: function (view, element) {
            //     // var b = $(calendar).fullCalendar('getDate');
            //     // alert(b.format('L'));
            //     console.log(moment(view.start._i).format('YYYY-MM-DD'));
            //     // console.log(moment(view.start._i).utc().format());
            //     console.log(moment(view.end._i).format('YYYY-MM-DD'));
            // },
            select: function (start, end) {
                var eventData;
                eventData = {
                    start: start,
                    end: end,
                    groomer: userInfo.id,
                };

                saveVisit(eventData);

                $(calendar).fullCalendar('renderEvent', eventData, true); // stick? = true
                $(calendar).fullCalendar('unselect');
            },
            events: function (start, end, timezone, callback) {
                // console.log(moment(start._d).format('YYYY-MM-DD'));
                // console.log(moment(end._d).format('YYYY-MM-DD'));
                const events = instance.getParsedEvents(true);
                // callback(instance.state.events)
                callback(events);
                // const events = this.props;
                // callback(events);
                // callback(this.state.events);
            },
            // defaultDate: '2018-05-14',
            eventLimit: true,
            eventClick: function (event) {
                // console.log(event.editable);
                instance.state.event = event;
                if (event.editable) {
                    instance.handleOpenModal(event);
                }

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
            selectable: true,
            selectHelper: true,
            dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
            dayNamesShort: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
        });
    }

    getParsedEvents = (renderCalendar = false) => {
        const { visits } = this.props;
        if (visits && visits.length > 0 && (!this.state.eventsLoaded || renderCalendar)) {
            this.handleLoadEvents();
            let currentEvents = visits.map((event, index) => {
                return {
                    id: _.get(event, 'id', ''),
                    title: `${this.prepareTitle(_.get(event, 'startAt', ''))}`,
                    start: _.get(event, 'startAt', ''),
                    end: _.get(event, 'endAt', ''),
                    allDay: false,
                    type: _.get(event, 'type', ''),
                    editable: this.prepareEditable(_.get(event, 'user')),
                    groomer: _.get(event, 'groomer.id', ''),
                    statusInfo: _.get(event, 'status.statusInfo', ''),
                    className: `${this.prepareClass(_.get(event, 'user'), _.get(event, 'type'))}`,
                }
            });
            this.setState({ events: currentEvents });
            return currentEvents;
        } else {
            return [];
        }
    }

    prepareClass(user, type) {
        // let prepareClass = null;
        if (!_.isEmpty(user) && type === 'home') { return 'home-booked'; }
        if (!_.isEmpty(user) && type === 'salon') { return 'salon-booked'; }
        if (_.isEmpty(user)) { return 'book-available'; }
    }

    prepareEditable(user) {
        // let editable = null;
        if (user !== undefined) {
            return false;
        } else {
            return true;
        }
    }

    prepareTitle(event) {
        let prepareEvent = null;
        // prepareEvent = moment(event).format('HH:mm');
        prepareEvent = moment(event).add(-2, 'hours').format('HH:mm');
        return prepareEvent;
    }

    setEvents = () => {
        const events = this.getParsedEvents();
        $(this.refs.calendar).fullCalendar('renderEvents', events);
    }

    render() {
        const { visits } = this.props;
        if (!this.state.eventsLoaded && visits.length > 0) {
            this.setEvents();
        }

        const modal = !_.isEmpty(this.props.initialValues) ? <PopUp {...this.props} isOpen={this.state.showModal} clearModal={this.handleCloseModal} /> : null;
        return (
            <div>
                <div ref='calendar'></div>
                {modal}
            </div>
        );
    }
}