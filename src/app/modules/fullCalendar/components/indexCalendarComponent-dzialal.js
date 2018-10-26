import React, { Component } from 'react';

import Calendar from './fullCalendarComponent';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: 'show',
            showModal: false,
            event: {},
            eventsLoaded: false,
            initEvents: false,
            startDate: null
        };

        this.getData = this.getData.bind(this);
    }

    getData(val){
        console.log(val);
    }

    componentWillMount() {
        this.props.fetchCalendar();
    }

    componentDidMount(){
        const { fetchCalendarOwner } = this.props;
        fetchCalendarOwner('jaroslaw-debski');
        // console.log(userInfo);
        // if (userInfo && userInfo.id) {
        //     fetchCalendarOwner(userInfo.id);
        // }
        // if (userInfo && userInfo.user) {
        //     fetchCalendarOwner(userInfo.user.id);
        // }
    }

    // componentWillMount() {
    //     const { fetchVisits, userInfo } = this.props;
    //     // console.log(userInfo);
    //     if (userInfo && userInfo.id) {
    //         // console.log(userInfo.id);
    //         fetchVisits(userInfo.id);
    //         this.setState({ initEvents: true });
    //     }
    //     if (userInfo && userInfo.user) {
    //         // console.log(userInfo.user.id);
    //         fetchVisits(userInfo.user.id);
    //         this.setState({ initEvents: true });
    //     }
    // }

    // componentDidMount() {
    //     const { fetchVisits, userInfo } = this.props;
    //     // console.log(userInfo);
    //     if (userInfo && userInfo.id) {
    //         // console.log(userInfo.id);
    //         fetchVisits(userInfo.id);
    //         this.setState({ initEvents: true });
    //     }
    //     if (userInfo && userInfo.user) {
    //         // console.log(userInfo.user.id);
    //         fetchVisits(userInfo.user.id);
    //         this.setState({ initEvents: true });
    //     }
    //     // fetchVisits(userInfo.id);
    //     // fetchVisits('592c06cab19af12a8c5d5551');
    //     // this.setState({ initEvents: true });

    // }

    componentWillUnmount() {
        this.props.clearVisits();
        this.props.clearCalendarOwner();
    }

    getFetchedGroomerVisits(uid) {
        const { fetchVisits } = this.props;
        fetchVisits(uid);
        this.setState({ initEvents: true });
    }

    render() {
        const {  userInfo, isLoading } = this.props;

        if (userInfo && userInfo.id && !this.state.initEvents) {
            this.getFetchedGroomerVisits(userInfo.id);
        }
        if (userInfo && userInfo.user && !this.state.initEvents) {
            this.getFetchedGroomerVisits(userInfo.user.id);
        }
        // if(userInfo && userInfo.user.id && !this.state.initEvents){
        // if(userInfo && userInfo.id && !this.state.initEvents){
        //     console.log('here');
        //     // this.getFetchedGroomerVisits(userInfo.user.id);
        //     this.getFetchedGroomerVisits(userInfo.id);
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