import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import renderDate from './renderDate';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Proszę wybrać rodzaj usługi.';
    }

    if (!formProps.petType) {
        errors.petType = 'Proszę wybrać rodzaj pupila.';
    }

    if (!formProps.petSize) {
        errors.petSize = 'Proszę wybrać rozmiar pupila.';
    }

    return errors;
}

class DeleteEventModal extends Component {

    onClick = () => {
        // this.props.clearEvent();
        this.props.handleCloseModal();
    }

    render() {
        const { handleSubmit, deleteVisit, isOpen, initialValues } = this.props;
        console.log('status DeleteModal', isOpen);
        console.log(initialValues);
        return (
            <div>
                <ReactModal isOpen={isOpen} onRequestClose={this.onClick} contentLabel="Usunięcie Eventu" overlayClassName='order-overlay' className='order-overlay-container'>
                    {/* <form onSubmit={handleSubmit(deleteVisit)}> */}
                    <form onSubmit={handleSubmit(deleteVisit)}>
                        <div className='order-overlay-header'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <p className='order-date'>{_.get(initialValues, 'title')}</p>
                                </div>
                                <div className='col-md-4 text-right'>
                                    <button type='button' className='close-button-container' onClick={this.onClick}>
                                        <i className='fa fa-times' aria-hidden='true'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='order-overlay-content'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Field
                                        name='id'
                                        id='id'
                                        type='text'
                                        component={renderDate}
                                        label='ID Eventu' />
                                    <p>Czy na pewno chcesz usunąć tę wizytę?</p>
                                    <p>
                                        <button className='btn btn-default btn-footer-register'>TAK <i className='fa fa-check' aria-hidden='true'></i></button>
                                        <button type='button' className="btn btn-default btn-footer-register" onClick={this.onClick}>NIE <i className="fa fa-times" aria-hidden="true"></i></button>
                                    </p>
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
    form: 'DeleteEventModal', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    // asyncValidate
})(DeleteEventModal)