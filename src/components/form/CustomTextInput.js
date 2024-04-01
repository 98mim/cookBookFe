import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import PropTypes from "prop-types";

const CustomTextInput = ({
  fieldName,
  type = "text",
  size = "md",
  label,
  isRequired,
  onDataChange,
  data,
}) => {
  const [inputValue, setInputValue] = useState(data);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue(value);
    onDataChange(name, value);
  };

  return (
    <div key={fieldName}>
      <div className="mb-2 block">
        <Label value={label}> {isRequired && "*"}</Label>
      </div>
      {type == "number" && (
        <TextInput
          id={fieldName}
          name={fieldName}
          type={type}
          placeholder={label}
          sizing={size}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(event) => event.stopPropagation()}
          min={"0"}
        />
      )}
      {type == "text" && (
        <TextInput
          id={fieldName}
          name={fieldName}
          type={type}
          placeholder={label}
          sizing={size}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(event) => event.stopPropagation()}
        />
      )}
    </div>
  );
};

CustomTextInput.propTypes = {
  fieldName: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  onDataChange: PropTypes.func,
  data: PropTypes.string,
};

export default CustomTextInput;
