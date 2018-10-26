import React from 'react';

const renderPetSizeSelect = ({ input, label, type, id, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <div>
            <p className='pet-size-section'>
                <select {...input} className="form-control" id={id} placeholder={label} type={type}>
                    <option value=''></option>
                    <option value='mały'>Mały</option>
                    <option value='średni'>Średni</option>
                    <option value='duży'>Duży</option>
                </select>
            </p>
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderPetSizeSelect;