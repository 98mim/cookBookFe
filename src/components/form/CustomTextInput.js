import { Label, TextInput, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

const CustomTextInput = ({
  fieldName,
  type = "text",
  size = "md",
  label,
  placeholder,
  isRequired = false,
  onDataChange,
  data,
  tooltip = null,
}) => {
  const [inputValue, setInputValue] = useState(data);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue(value);
    onDataChange(name, value);
  };

  useEffect(() => {
    setInputValue(data);
  }, [data]);

  return (
    <div key={fieldName}>
      <div className="mb-2 block flex flex-row mt-1">
        <Label value={label}> </Label>
        {isRequired && <span className="ml-1 text-red-500">*</span>}
        {tooltip != null && (
          <Tooltip content={tooltip} className={"ml-1"}>
            <HiOutlineQuestionMarkCircle
              className={"text-gray-500 ml-1"}
              size={20}
            />
          </Tooltip>
        )}
      </div>
      {type == "number" && (
        <TextInput
          id={fieldName}
          name={fieldName}
          type={type}
          placeholder={placeholder != null ? placeholder : label}
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
          placeholder={placeholder != null ? placeholder : label}
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
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
};

export default CustomTextInput;
