import React from 'react';

const renderTextarea = ({ input, label, type, id, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <div>
      <textarea {...input} className="profile-textarea form-control" id={id} placeholder={label} type={type}></textarea>
       <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
)

export default renderTextarea;