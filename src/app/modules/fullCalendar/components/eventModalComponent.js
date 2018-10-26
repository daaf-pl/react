import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import renderSelect from './renderSelect';
import renderTypeSelect from './renderTypeSelect';
import renderPetSelect from './renderPetSelect';
import renderPetSizeSelect from './renderPetSizeSelect';
import renderDate from './renderDate';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

function validate(formProps) {
    const errors = {};

    if (!formProps.bookedServices) {
        errors.bookedServices = 'Proszę wybrać rodzaj usługi.';
    }

    if (!formProps.petType) {
        errors.petType = 'Proszę wybrać rodzaj pupila.';
    }

    if (!formProps.petSize) {
        errors.petSize = 'Proszę wybrać rozmiar pupila.';
    }
    if (!formProps.visitType) {
        errors.visitType = 'Proszę wybrać typ wizyty.';
    }

    return errors;
}

class PopUpOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialFieldState: {
                errors: {}
            }
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal() {
        // const initialFieldState = {
        //     errors: {}
        // };
        this.props.clearEventModal();
    }

    onClick = () => {
        this.props.clearModal();
        this.handleCloseModal();
    }

    fetchUserServices() {
        const { ownerCalendar } = this.props;
        const services = _.get(ownerCalendar, 'calendarOwnerInfo.services', []);

        let currentService = null;

        if (services.length > 0) {
            currentService = services.map((curServ, index) =>
                <option value={curServ.id} key={index}>{curServ.name}</option>
            );
        }
        // return [<option key='1' value="5943ac145496660f04db5747">Inne</option>];
        return currentService;
    }

    render() {
        const { handleSubmit/*, reserveVisit*/, modifyVisit, ownerCalendar, isOpen, initialValues, getEventAllDetails, userInfo } = this.props;
        // console.log('status Zwykłego modala', isOpen);
        // console.log('info o zalogowanym userze', userInfo);
        // console.log('info o właścicielu kalendarza', ownerCalendar);
        // console.log(getEventAllDetails);
        // console.log(initialValues);
        initialValues.start = getEventAllDetails.start;
        if (userInfo && userInfo.user) {
            initialValues.loogedUserId = userInfo.user.id;
        } else {
            initialValues.loogedUserId = userInfo.id;
        }
        initialValues.id = getEventAllDetails.id;
        // console.log(initialValues);
        return (
            <div>
                <ReactModal isOpen={isOpen} onRequestClose={this.onClick} contentLabel="Minimal Modal Example" overlayClassName='order-overlay animated' className='order-overlay-container'>
                    <form onSubmit={handleSubmit(modifyVisit)}>
                        {/* <form> */}
                        <div className='order-overlay-header'>
                            <div className='row'>
                                <div className='col-md-8'>
                                <p className='order-date'><i className="fa fa-calendar"></i> {_.get(initialValues, 'title')}</p>
                                </div>
                                <div className='col-md-4'>
                                    <button type='button' className='changeDateButton'>Zmień datę</button>
                                    <button type='button' className='close-button-container' onClick={this.onClick}>
                                        <i className='fa fa-times' aria-hidden='true'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='order-overlay-content container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Field
                                        name='loogedUserId'
                                        id='loogedUserId'
                                        type='hidden'
                                        component={renderDate}
                                        label='ID' />
                                    <Field
                                        name='id'
                                        id='id'
                                        type='hidden'
                                        component={renderDate}
                                        label='Event ID' />
                                    <p className='user-info'>{_.get(ownerCalendar, 'calendarOwnerInfo.nameSurrname')}</p>
                                    <p className='user-info-description'>Certyfikowany fryzjer</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Field
                                        name='visitType'
                                        id='visitType'
                                        type='select'
                                        component={renderTypeSelect}
                                        label='Wybierz typ wizyty'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Field
                                        name='bookedServices'
                                        id='bookedServices'
                                        type='select'
                                        component={renderSelect}
                                        label={this.fetchUserServices()}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Field
                                        name='petType'
                                        id='petType'
                                        type='select'
                                        component={renderPetSelect}
                                        label='Typ zwierzaka'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Field
                                        name='petSize'
                                        id='petSize'
                                        type='select'
                                        component={renderPetSizeSelect}
                                        label='wybierz rozmiar pupila'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 text-right'>
                                    <button type='submit' className='sendButton'>Zatwierdź wizytę <i className='fa fa-check' aria-hidden='true'></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </ReactModal>
            </div>
        );
    }
}

export default reduxForm({
    form: 'PopUpOrder', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    // asyncValidate
})(PopUpOrder)