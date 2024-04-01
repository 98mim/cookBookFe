import { Label, Textarea } from "flowbite-react";
import React from "react";
import PropTypes from "prop-types";

const CustomTextArea = ({
  fieldName,
  size = "md",
  label,
  isRequired,
  onDataChange,
  defaultValue,
  placeholder,
}) => {
  const handleInputChange = (event) => {
    event.stopPropagation();
    const { name, value } = event.target;
    onDataChange(name, value);
  };

  return (
    <>
      <div key={fieldName}>
        <div className="mb-2 block">
          <Label value={label}> {isRequired && "*"}</Label>
        </div>
        <Textarea
          name={fieldName}
          placeholder={placeholder}
          onChange={handleInputChange}
          defaultValue={defaultValue}
          sizing={size}
        />
      </div>
    </>
  );
};

CustomTextArea.propTypes = {
  fieldName: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  onDataChange: PropTypes.func,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomTextArea;
