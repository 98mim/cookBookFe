import React, { useState } from "react";
import IngredientFilterSelect from "./filter/IngredientFilterSelect";
import PropTypes from "prop-types";
import CustomTextInput from "./form/CustomTextInput";
import { difficulty } from "../util/Difficulty";
import CustomSelectFilter from "./filter/CustomSelectFilter";
import { courseTypes } from "../util/CourseTypes";
import { useTranslation } from "react-i18next";
import CustomButton from "./CustomButton";
import CustomFilterSideBar from "./CustomFilterSideBar"; // Import the sidebar component

const CustomFilterBar = ({ handleDataChange, filterData }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control drawer open state

  const handleChange = (name, value) => {
    handleDataChange(name, value);
  };

  const { t } = useTranslation();

  const handleOpenDrawer = () => {
    setIsOpen(true); // Open the drawer when button is clicked
  };

  return (
    <div
      className={
        "group flex items-stretch justify-center text-center font-medium border border-transparent bg-gradient-to-r from-purple-500 to-pink-500  focus:ring-4 focus:ring-purple-200 enabled:hover:bg-gradient-to-l rounded-lg m-0.5"
      }
    >
      <div
        className={
          "flex w-full m-1 bg-white rounded-lg p-2 justify-center text-center"
        }
      >
        <IngredientFilterSelect onDataChange={handleChange} />
        <CustomTextInput
          fieldName={"name"}
          data={filterData.name}
          onDataChange={handleChange}
          label={t("Recipe.name")}
          placeholder={"Name"}
        />
        <CustomSelectFilter
          optionsSelector={difficulty}
          onDataChange={handleChange}
          label={t("Recipe.difficulty")}
          data={filterData.difficulty}
          fieldName={"difficulty"}
          translation={"Difficulty."}
        />
        <CustomSelectFilter
          optionsSelector={courseTypes}
          onDataChange={handleChange}
          label={t("Recipe.courseType")}
          data={filterData.courseType}
          fieldName={"courseType"}
          translation={"CourseType."}
        />
        <CustomTextInput
          fieldName={"overallTime"}
          data={filterData.overallTime}
          onDataChange={handleChange}
          label={t("Time.overall")}
          placeholder={"Overall Time"}
          type={"number"}
        />
        <CustomButton
          text={t("filter.openButton")}
          onClick={handleOpenDrawer}
        />{" "}
        {/* Button to open drawer */}
      </div>
      <CustomFilterSideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDataChange={handleDataChange}
        filterData={filterData}
      />
    </div>
  );
};

CustomFilterBar.propTypes = {
  handleDataChange: PropTypes.func,
  filterData: PropTypes.object,
};

export default CustomFilterBar;
