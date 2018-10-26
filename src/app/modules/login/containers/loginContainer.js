import React, { Component } from 'react';
import { sendPageView } from '../../application/actions/viewAction';
import { connect } from 'react-redux';
import Login from '../components/loginComponent';
import { loginFormAction, clearIsLoading, showIsLoading } from '../actions/loginAction';

class LoginContener extends Component {
    render() {
        return (
            <Login {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pageView: state.pageView,
    isLoading: state.loginReducer.isLoading,
    errorMessage: state.loginReducer.error,
    isAuth: state.authReducer.isAuth
    // loginMessage: state.loginReducer.loginMessage,
    // token: state.loginReducer.token,
    // authenticated: state.loginReducer.authenticated
})

const mapDispatchToProps = dispatch => ({
    sendPageView: pageView => {
        dispatch(sendPageView(pageView));
    },
    clearIsLoading: () => {
        dispatch(clearIsLoading());
    },
    showIsLoading: () => {
        dispatch(showIsLoading());
    },
    loginFormAction: params => {
        dispatch(loginFormAction(params));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContener);
// export default LoginContener;