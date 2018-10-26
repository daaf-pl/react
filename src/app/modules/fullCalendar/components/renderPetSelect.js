import React from 'react';

const renderPetSelect = ({ input, label, type, id, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <div>
            <p className='pet-section'>
                <select {...input} className="form-control" id={id} placeholder={label} type={type}>
                    <option value=''></option>
                    <option value='Pies'>Pies</option>
                    <option value='Kot'>Kot</option>
                </select>
            </p>
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderPetSelect;