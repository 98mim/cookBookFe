import PropTypes from "prop-types";
import { Label, Select } from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";

const CustomSelectFilter = ({
  optionsSelector,
  data,
  onDataChange,
  label,
  fieldName,
  translation,
}) => {
  const { t } = useTranslation();
  if (!optionsSelector.includes("")) {
    optionsSelector.push("");
  }
  const handleDataChange = (event) => {
    const { name, value } = event.target;
    const val = value === "" ? null : value;
    onDataChange(name, val);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={fieldName} value={label} />
      </div>
      <Select
        id={fieldName}
        name={fieldName}
        value={data === null ? "" : data}
        onChange={handleDataChange}
      >
        {optionsSelector.map((value, index) => (
          <option key={index} value={value}>
            {t(translation + value)}
          </option>
        ))}
      </Select>
    </div>
  );
};

CustomSelectFilter.propTypes = {
  optionsSelector: PropTypes.array.isRequired,
  data: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  onDataChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
};

export default CustomSelectFilter;
