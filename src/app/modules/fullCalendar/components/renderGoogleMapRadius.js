import React from 'react';

const renderGoogleMapRadius = ({ input, label, type, id, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <div>
            <p className='visits-google-radius'>
                <select {...input} className='form-control' id={id} placeholder={label} type={type}>
                    <option value='5000'>+ 5km</option>
                    <option value='10000'>+ 10km</option>
                    <option value='15000'>+ 15km</option>
                </select>
            </p>
            <div className='help-block'>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderGoogleMapRadius;