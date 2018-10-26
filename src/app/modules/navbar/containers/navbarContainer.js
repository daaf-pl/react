import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/navbarComponent';

class NavbarContener extends Component {
    render() {
        return (
            <Navbar {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContener);