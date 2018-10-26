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
            eventsLoaded: false,
            dupa: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleLoadEvents = this.handleLoadEvents.bind(this);
        this.handleLoadEventsFalse = this.handleLoadEventsFalse.bind(this);
    }

    handleOpenModal(event) {
        const { getEventModalDetails } = this.props;
        getEventModalDetails(event);
        // console.log(event);
        // this.setState({  });
        this.setState({ showModal: true, initialValues: event });
    }

    handleCloseModal() {
        const { calendar } = this.refs;
        this.setState({ showModal: false });
        $(calendar).fullCalendar('rerenderEvents');
    }

    handleLoadEvents() {
        // console.log('here');
        this.setState({ eventsLoaded: true });
    }

    demoMethod = (value) => {
        // var lang = this.refs.dropdown.value;
        this.props.sendData(value);
    }

    // componentDidMount() {
    //     const instance = this;
    //     const { modifyVisit, saveVisit, ownerCalendar } = this.props;
    //     // console.log(ownerCalendar);
    //     const { calendar } = this.refs;
    //     // let { value } = '';

    //     $(calendar).fullCalendar({
    //         defaultView: 'agendaThreeDay',
    //         views: {
    //             agendaThreeDay: {
    //                 type: 'agenda',
    //                 duration: { days: 3 },
    //                 buttonText: '3 dni',
    //                 eventLimit: 2
    //             }
    //         },
    //         header: {
    //             left: 'prev,next today',
    //             right: 'agendaThreeDay,agendaWeek,month'
    //         },
    //         minTime: '08:00:00',
    //         maxTime: '21:00:00',
    //         // viewRender: function (view, element) {
    //         //     // var b = $(calendar).fullCalendar('getDate');
    //         //     // alert(b.format('L'));
    //         //     $(calendar).fullCalendar('rerenderEvents');
    //         //     console.log(moment(view.start._i).format('YYYY-MM-DD'));
    //         //     // console.log(moment(view.start._i).utc().format());
    //         //     console.log(moment(view.end._i).format('YYYY-MM-DD'));
    //         // },
    //         select: function (start, end) {
    //             var eventData;
    //             eventData = {
    //                 start: start,
    //                 end: end,
    //                 groomer: ownerCalendar.calendarOwnerInfo.id,
    //             };

    //             saveVisit(eventData);
    //             // $(calendar).fullCalendar('rerenderEvents');
    //             $(calendar).fullCalendar('renderEvent', eventData, true); // stick? = true
    //             $(calendar).fullCalendar('unselect');
    //         },
    //         events: function (start, end, timezone, callback) {
    //             if (ownerCalendar.calendarOwnerInfo) {
    //                 console.log('mam');
    //                 instance.demoMethod(
    //                     instance.value = {
    //                         ownerId: ownerCalendar.calendarOwnerInfo.id,
    //                         start: moment(start._d).format('YYYY-MM-DD'),
    //                         end: moment(end._d).format('YYYY-MM-DD')
    //                     });
    //             } else {
    //                 console.log('dupa');
    //             }
    //             const events = instance.getParsedEvents(true);
    //             // console.log(visits);
    //             callback(events);
    //         },
    //         editable: true,
    //         eventLimit: true,
    //         eventClick: function (event) {
    //             // console.log(event.editable);
    //             instance.state.event = event;
    //             // if (event.editable) {
    //             instance.handleOpenModal(event);
    //             // }

    //         },
    //         eventDrop: function (event, delta, revertFunc) {
    //             event.groomerEdited = true;
    //             // alert(event.title + " was dropped on " + event.start.format());
    //             // console.log('front', event);
    //             modifyVisit(event);
    //             // if (!confirm("Are you sure about this change?")) {
    //             // revertFunc();
    //             // }
    //         },
    //         eventResize: function (event, delta, revertFunc) {
    //             // alert(event.title + " end is now " + event.end.format());
    //             modifyVisit(event);
    //         },
    //         selectable: true,
    //         selectHelper: true,
    //         dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    //         dayNamesShort: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    //     });
    // }

    getParsedEvents = (renderCalendar = false) => {
        const { visits } = this.props;
        if (visits && visits.length > 0 && (!this.state.eventsLoaded || renderCalendar)) {
            // if (visits && visits.length > 0) {
            this.handleLoadEvents();
            let currentEvents = visits.map((event, index) => {
                // console.log(event.user);
                return {
                    id: _.get(event, 'id', ''),
                    // title: `${this.prepareTitle(_.get(event, 'startAt', ''))}`,
                    title: `${this.prepareTitle(_.get(event, 'type', ''), _.get(event, 'user'))}`,
                    start: _.get(event, 'startAt', ''),
                    end: _.get(event, 'endAt', ''),
                    allDay: false,
                    type: _.get(event, 'type', ''),
                    groomer: _.get(event, 'groomer.id', ''),
                    statusInfo: _.get(event, 'status.statusInfo', ''),
                    className: `${this.prepareClass(_.get(event, 'user'), _.get(event, 'type'))}`,
                }
            });
            return currentEvents;
        } else {
            return [];
        }
    }

    prepareClass(user, type) {
        // console.log(user);
        // // let prepareClass = null;
        if (!_.isEmpty(user)) { return 'book-unavailable'; }
        // if (!_.isEmpty(user) && type === 'home') { return 'home-booked'; }
        // if (!_.isEmpty(user) && type === 'salon') { return 'salon-booked'; }
        if (_.isEmpty(user) && type === 'home') { return 'home-available'; }
        if (_.isEmpty(user) && type === 'salon') { return 'salon-available'; }
        if (_.isEmpty(user) && _.isEmpty(type)) { return 'book-available'; }
    }

    prepareTitle(type, user) {
        // let returnedTitle = null;
        // prepareEvent = moment(event).add(-2, 'hours').format('HH:mm');
        if (_.isEmpty(user) && _.isEmpty(type)) { return 'Wizyta niezdefiniowana'; }
        if (_.isEmpty(user) && !_.isEmpty(type) && type === 'salon') { return 'Zarezerwuj wizytę w salonie'; }
        if (_.isEmpty(user) && !_.isEmpty(type) && type === 'home') { return 'Zarezerwuj wizytę w domu'; }
        if (!_.isEmpty(user) && !_.isEmpty(type) && type === 'salon') { return 'Zarezerwowana wizyta w salonie'; }
        if (!_.isEmpty(user) && !_.isEmpty(type) && type === 'home') { return 'Zarezerwowana wizyta w domu'; }
        // return returnedTitle;
    }

    // setEvents = () => {
    //     const events = this.getParsedEvents();
    //     $(this.refs.calendar).fullCalendar('renderEvents', events);
    // }

    // render() {
    //     const { visits } = this.props;
    //     // console.log(visits);
    //     if (!this.state.eventsLoaded && visits.length > 0) {
    //         this.setEvents();
    //     }

    //     const modal = !_.isEmpty(this.props.initialValues) ? <PopUp {...this.props} isOpen={this.state.showModal} clearModal={this.handleCloseModal} /> : null;
    //     return (
    //         <div>
    //             {/* <select ref='dropdown' onChange={this.demoMethod}>
    //                 <option value="dup1">1</option>
    //                 <option value="dup2">2</option>
    //                 <option value="dup3">3</option>
    //             </select> */}
    //             <div ref='calendar'></div>
    //             {modal}
    //         </div>
    //     );
    // }

    updateEvents = (eventsList) => {
        let instance = this;
        const { modifyVisit, saveVisit, ownerCalendar } = this.props;
        const { calendar } = this.refs;
        console.log('update start');
        $(calendar).fullCalendar('destroy');
        $(calendar).fullCalendar({
            theme: false,
            timezone: 'local',
            defaultView: 'agendaThreeDay',
            views: {
                agendaThreeDay: {
                    type: 'agenda',
                    duration: { days: 3 },
                    buttonText: '3 dni',
                    eventLimit: 2
                }
            },
            header: {
                left: 'prev,next today',
                right: 'agendaThreeDay,agendaWeek,month'
            },
            // viewRender: function (view, element) {
            //     // console.log('od: ' + moment(view.start._i).format('YYYY-MM-DD') + ' - do: ' + moment(view.end._i).format('YYYY-MM-DD'));
            //     if (ownerCalendar.calendarOwnerInfo) {
            //         instance.demoMethod(
            //             instance.value = {
            //                 ownerId: ownerCalendar.calendarOwnerInfo.id,
            //                 start: moment(view.start._i).format('YYYY-MM-DD'),
            //                 end: moment(view.end._i).format('YYYY-MM-DD')
            //             }
            //         );
            //     } else {
            //         // console.log('dupa');
            //     }
            // },
            select: function (start, end) {
                var eventData;
                eventData = {
                    start: start,
                    end: end,
                    groomer: ownerCalendar.calendarOwnerInfo.id,
                };

                saveVisit(eventData);
                // $(calendar).fullCalendar('rerenderEvents');
                $(calendar).fullCalendar('renderEvent', eventData, true); // stick? = true
                $(calendar).fullCalendar('unselect');
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
            navLinks: false,
            editable: true,
            // eventLimit: true,
            allDaySlot: false,
            scrollTime: '09:00:00',
            minTime: '09:00:00',
            maxTime: '18:00:00',
            // defaultdate: dateFormat(Date(), "yyyy-mm-dd"),
            events: eventsList,
            contentHeight: 'auto',
        });
    }

    handleLoadEventsFalse() {
        this.setState({ eventsLoaded: false });
        // console.log(this.state.eventsLoaded);
    }

    componentDidMount() {
        const preparedVisits = this.getParsedEvents(true);
        this.updateEvents(preparedVisits) //you can pass the eventsList as a prop
    }

    componentWillReceiveProps() {
        // $('#calendar').fullCalendar('rerenderEvents');
        // console.log('Will receive props: ');
        // this.setState({ dupa: false });
    }

    componentDidUpdate(prevProps, prevState) {
        const { visits } = this.props;
        if (visits !== prevProps.visits) {
            // this.setState({ dupa: true });
            this.setState({ dupa: true });
            console.log('hello ' + this.state.dupa);
            // const preparedVisits = this.getParsedEvents(true);
            // this.updateEvents(preparedVisits)
            // $('#calendar').fullCalendar('rerenderEvents');
            // const preparedVisits = this.getParsedEvents(true);
            // this.updateEvents(preparedVisits)  //you can pass eventsList as a prop
        }
        // console.log(visits);
        // console.log(this.state.eventsLoaded);
        if (!this.state.eventsLoaded && visits.length > 0) {
            //         console.log('here');
            //         // this.setState({ eventsLoaded: true });
            const preparedVisits = this.getParsedEvents(true);
            this.updateEvents(preparedVisits)  //you can pass eventsList as a prop
        }
        if (this.state.dupa) {
            this.setState({ dupa: false });
        }
        console.log('bye ' + this.state.dupa);

        // if (this.state.dupa && this.state.eventsLoaded) {
        //     console.log('here: ' + visits);
        //     //     // this.setState({ dupa: false });
        //     // this.setState({ eventsLoaded: true });
        //     const preparedVisits = this.getParsedEvents(true);
        //     this.updateEvents(preparedVisits)  //you can pass eventsList as a prop
        // }
        // console.log(this.state.dupa);
    }

    render() {
        const { /*visits,*/ newValue } = this.props;
        // console.log('render Callendar: ' + visits);
        console.log(newValue);
        const modal = !_.isEmpty(this.props.initialValues) ? <PopUp {...this.props} isOpen={this.state.showModal} clearModal={this.handleCloseModal} /> : null;

        return (
            <div>
                <div ref='calendar'></div>
                {/* {modal} */}
            </div>
        );
    }
}