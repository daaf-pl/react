import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { sendPageView } from '../../application/actions/viewAction';
import { fetchSmsList, clearSmsList } from '../actions/smsListAction';
import SmsList from '../components/smsListComponent';

class SmsListContener extends Component {
    render() {
        return (
            <SmsList {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    smsList: state.smsListReducer.smsList,
    isLoading: state.smsListReducer.isLoading
})

const mapDispatchToProps = dispatch => ({
    fetchSmsList: uid => {
        dispatch(fetchSmsList(uid));
    },
    clearSms: () => {
        dispatch(clearSmsList());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SmsListContener);