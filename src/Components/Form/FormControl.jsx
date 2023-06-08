import React from "react";
import './Style/FormControl/FormControl.scss'

const FormControl = ( {label, input, error, toolTip} ) => {
  return (
    <div className="form-control">
      <label className={error ? "required" : ""} htmlFor={input.props.id}>
        {label}
        {toolTip && (
        <span className={toolTip}></span>
        )}
      </label>
      {input}
      {error && <span className="required">{error}</span>}
    </div>
  );
};

export default FormControl;
