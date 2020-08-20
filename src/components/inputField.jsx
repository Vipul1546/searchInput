import * as React from "react";

const InputField = (props) => {
  return (
    <input
      className="form-control"
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value === undefined ? "" : props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      autoComplete="off"
    />
  );
};

export default InputField;
