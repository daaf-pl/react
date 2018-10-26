import React, { Component } from 'react';

import Calendar from './fullCalendarComponent';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: 'show',
            groomerId: null,
            showModal: false,
            event: {},
            eventsLoaded: false,
            initEvents: false,
            startDate: null
        };

        this.getData = this.getData.bind(this);
    }

    getData(val) {
        console.log(val);
        const { userInfo, fetchVisits } = this.props;
        if (userInfo && userInfo.id) {
            this.setState({ groomerId: userInfo.id });
            fetchVisits(userInfo.id, val);
            this.setState({ initEvents: true });
            // this.getFetchedGroomerVisits(userInfo.id);
        }
        // console.log(val);
    }

    componentDidMount() {
        const { fetchCalendarOwner } = this.props;
        const val = { ownerId: "592c06cab19af12a8c5d5551", start: "2018-05-31", end: "2018-06-03" }
        // const val = { ownerId: "592c06cab19af12a8c5d5551", start: "2018-10-15", end: "2018-10-18" }
        const { userInfo, fetchVisits } = this.props;

        this.props.fetchCalendar();
        fetchCalendarOwner('jaroslaw-debski');

        if (userInfo && userInfo.id) {
            this.setState({ groomerId: userInfo.id });
            fetchVisits(userInfo.id, val);
            this.setState({ initEvents: true });
        }
    }

    // mountCalendar(userInfo) {
    //     const { fetchCalendarOwner } = this.props;
    //     const val = { ownerId: "592c06cab19af12a8c5d5551", start: "2018-05-31", end: "2018-06-03" }
    //     const { fetchVisits } = this.props;

    //     this.props.fetchCalendar();
    //     fetchCalendarOwner('jaroslaw-debski');

    //     if (userInfo && userInfo.id) {
    //         this.setState({ groomerId: userInfo.id });
    //         fetchVisits(userInfo.id, val);
    //         this.setState({ initEvents: true });
    //     }
    // }

    componentWillUnmount() {
        this.props.clearVisits();
        this.props.clearCalendarOwner();
    }

    render() {
        const { isLoading } = this.props;
        // console.log(this.props.userInfo);
        // if(this.props.userInfo){
        //     this.mountCalendar(this.props.userInfo);
        // }

        if (isLoading) {
            return (
                <div className='App'>
                    <div className='ReactRoot'>
                        <div>
                            <div>
                                <div className={`PageLoaderView show`}>
                                    <div className='spinner'>
                                        <div className='rect1'></div>
                                        <div className='rect2'></div>
                                        <div className='rect3'></div>
                                        <div className='rect4'></div>
                                        <div className='rect5'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Calendar {...this.props} sendData={this.getData} />
                </div>
            );
        }
    }
}