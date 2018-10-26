import React from 'react';

const renderSelect = ({ input, label, type, id, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <div>
            <p className='services-section'>
                <select {...input} className="form-control" id={id} type={type}>
                    <option value=''></option>
                    {label}
                    {/* <option value='Trymowanie'>Trymowanie</option>
        <option value='Strzyżenie'>Strzyżenie</option> */}
                </select>
            </p>
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderSelect;