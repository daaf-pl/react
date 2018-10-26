import React from 'react';

const renderTypeSelect = ({ input, label, type, id, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <div>
            <p className='services-section'>
                <select {...input} className="form-control" id={id} type={type}>
                    <option value=''>Wybierz typ wizyty</option>
                    <option value='salon'>Wizyta w salonie</option>
                    <option value='home'>Wizyta domowa</option>
                </select>
            </p>
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderTypeSelect;