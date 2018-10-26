import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { sendPageView } from '../../application/actions/viewAction';
import { fetchSms, clearSms } from '../actions/smsAction';
import Sms from '../components/smsComponent';

class SmsContener extends Component {
    render() {
        return (
            <Sms {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    sms: state.smsReducer.sms,
    isLoading: state.smsReducer.isLoading
})

const mapDispatchToProps = dispatch => ({
    fetchSms: uid => {
        dispatch(fetchSms(uid));
    },
    clearSms: () => {
        dispatch(clearSms());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SmsContener);