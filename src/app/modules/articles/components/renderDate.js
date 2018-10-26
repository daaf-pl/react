import React from 'react';

const renderDate = ({ input, label, type, id, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <div>
      <input {...input} className="form-control" id={id} placeholder={label} type={type}/>
       <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
)

export default renderDate;