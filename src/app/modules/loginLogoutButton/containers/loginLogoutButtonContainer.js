import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginLogoutButton from '../components/loginLogoutButtonComponent';

class LoginLogoutButtonContener extends Component {
    render() {
        return (
            <LoginLogoutButton {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogoutButtonContener);