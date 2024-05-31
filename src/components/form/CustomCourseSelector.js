import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { courseTypes } from "../../util/CourseTypes";

const CustomCourseSelector = ({ onDataChange, data }) => {
  const [selectedOption, setSelectedOption] = useState(data);
  const { t } = useTranslation();
  const options = courseTypes;

  const handleChange = (option) => {
    setSelectedOption(option);
    onDataChange("courseType", option);
  };

  return (
    <div className="flex flex-wrap justify-between">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleChange(option)}
          className={`w-28 h-28 m-2 cursor-pointer hover:cursor-pointer flex items-center justify-center rounded-lg ${selectedOption === option ? "bg-purple-400" : "bg-indigo-100 hover:bg-indigo-400"}`}
        >
          {t("CourseType." + option)}
        </div>
      ))}
    </div>
  );
};

CustomCourseSelector.propTypes = {
  onDataChange: PropTypes.func,
  data: PropTypes.string,
};

export default CustomCourseSelector;
