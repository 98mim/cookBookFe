import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "flowbite-react";
import { HiFilter } from "react-icons/hi";
import CustomTextInput from "./form/CustomTextInput";
import { useTranslation } from "react-i18next";

const CustomFilterSideBar = ({
  isOpen,
  setIsOpen,
  handleDataChange,
  filterData,
}) => {
  const handleClose = () => setIsOpen(false);
  const handleChange = (name, value) => {
    handleDataChange(name, value);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title={t("Filter.filter")} titleIcon={HiFilter} />
        <Drawer.Items>
          <CustomTextInput
            fieldName={"name"}
            data={filterData.name}
            onDataChange={handleChange}
            label={t("Recipe.name")}
            placeholder={"Name"}
          />
          {/* Add more filters as needed */}
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
