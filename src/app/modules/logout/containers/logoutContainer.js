import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logoutAction';
import Logout from '../components/logoutComponent';

class LogoutContener extends Component {
    render() {
        return (
            <Logout {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pageView: state.logoutView.view,
    isLoading: state.logoutView.isLoading,
    isAuth: state.authReducer.isAuth = false,
    userInfo: state.authReducer.userInfo = {}
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => {
        dispatch(logoutUser());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContener);