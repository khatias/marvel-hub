import React from "react";
import './CustomInput.css'
const CustomInput = ({ 
  type = "text", 
  name,
  id,
  placeholder,
  value,
  onChange,
  className = "", 
  ...rest 
}) => {
  return (
    <input
      className={`input-field ${className}`} 
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest} 
    />
  );
};

export default CustomInput;
