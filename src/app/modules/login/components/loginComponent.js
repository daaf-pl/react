import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import renderField from './renderField';
import FacebookLogin from '../../facebookLogin/index';
import { GoogleLogin } from 'react-google-login';
import './style.css';

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Proszę wprowadzić adres email.';
    }

    if (!formProps.password) {
        errors.password = 'Proszę wprowadzić hasło.';
    }

    return errors;
}

class LoginForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            test: '',
            isLogged: false
        };

        this.handleLoginUpdate = this.handleLoginUpdate.bind(this);
    }

    handleLoginUpdate() {
        this.setState({ isLogged: true });
    }

    componentDidMount() {
        this.props.sendPageView('login');
        this.props.clearIsLoading();
    }

    componentWillUpdate() {
        const { isLogged } = this.state;
        if (isLogged) {
            return (
                <Redirect to="/" />
            );
        }
    }

    componentWillUnmount() {
        this.props.showIsLoading();
    }

    renderLogin() {
        const { errorMessage, isAuth } = this.props;
        if (errorMessage) {
            return (
                <div className='alert alert-danger'>Podano nieprawidłowe dane podczas logowania.</div>
            );
        }
        // console.log(isAuth);
        if (isAuth) {
            // this.handleLoginUpdate();
            return (
                <div className='alert alert-success'>Zalogowano do serwisu.</div>
            );
        }
    }

    render() {
        const { handleSubmit, loginFormAction, pageView, isAuth, isLoading } = this.props;

        const responseGoogle = (response) => {
            console.log(response);
        }

        // const alert = _.get(this.renderLogin()) ? this.renderLogin() : null;
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
            if (!isAuth) {
                return (
                    <div className={`${pageView.view}`} id={`${pageView.view}`}>
                        <div className='container'>
                            <div className='card-container flipInX animated signup-form-container'>
                                <div className=''>
                                    <img alt='' className="profile-img-card" id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                                    {this.renderLogin()}
                                    <form onSubmit={handleSubmit(loginFormAction)}>

                                        <div className='row'>
                                            <div className='col-md-12 required-pool'>
                                                <div className="expand">
                                                    <Field
                                                        name='email'
                                                        id='email'
                                                        type='text'
                                                        component={renderField}
                                                        label='wprowadź adres email' />
                                                    <div className="lined-border"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-12 required-pool'>
                                                <div className="expand">
                                                    <Field
                                                        name='password'
                                                        id='password'
                                                        type='password'
                                                        component={renderField}
                                                        label='wprowadź hasło' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row submit-buttons'>
                                            <div className='col-md-12'>
                                                <button type='submit' name='' id='' className='btn btn-lg btn-primary btn-block btn-signin'>Zaloguj</button>
                                            </div>
                                        </div>
                                        <div className='row submit-buttons'>
                                            <div className='col-md-12'>
                                                <FacebookLogin />
                                            </div>
                                        </div>
                                        <div className='row submit-buttons'>
                                            <div className='col-md-12'>
                                                <GoogleLogin
                                                    clientId="842927958272-tph75as3ifq4p337s6ke74oi794q50bb.apps.googleusercontent.com"
                                                    buttonText="Zaloguj przez Google+"
                                                    className="btn btn-danger btn-block googleplus"
                                                    onSuccess={responseGoogle}
                                                    onFailure={responseGoogle}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <Redirect to="/" />
                );
            }
        }
    }
}


export default reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    // asyncValidate
})(LoginForm)
