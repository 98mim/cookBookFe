import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "flowbite-react";
import { HiFilter } from "react-icons/hi";
import CustomTextInput from "./form/CustomTextInput";
import { useTranslation } from "react-i18next";
import CustomSelectFilter from "./filter/CustomSelectFilter";
import { difficulty } from "../util/Difficulty";
import { courseTypes } from "../util/CourseTypes";
import IngredientFilterSelect from "./filter/IngredientFilterSelect";

const CustomFilterSideBar = ({
  isOpen,
  setIsOpen,
  handleDataChange,
  filterData,
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (name, value) => {
    handleDataChange(name, value); // Propagate change to parent
  };

  const { t } = useTranslation();

  return (
    <div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title={t("Filter.filter")} titleIcon={HiFilter} />
        <Drawer.Items>
          <IngredientFilterSelect
            onDataChange={handleChange}
            selectedData={filterData.ingredients}
          />
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
            tooltip={t("Tooltips.filter")}
          />
          <CustomTextInput
            fieldName={"prepTime"}
            data={filterData.prepTime}
            onDataChange={handleChange}
            label={t("Time.prep")}
            placeholder={"Preparation Time"}
            type={"number"}
            tooltip={t("Tooltips.filter")}
          />
          <CustomTextInput
            fieldName={"cookTime"}
            data={filterData.cookTime}
            onDataChange={handleChange}
            label={t("Time.cook")}
            placeholder={"Cook Time"}
            type={"number"}
            tooltip={t("Tooltips.filter")}
          />
          <CustomTextInput
            fieldName={"bakeTime"}
            data={filterData.bakeTime}
            onDataChange={handleChange}
            label={t("Time.bake")}
            placeholder={"Bake Time"}
            type={"number"}
            tooltip={t("Tooltips.filter")}
          />
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

CustomFilterSideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  filterData: PropTypes.object.isRequired,
};

export default CustomFilterSideBar;
