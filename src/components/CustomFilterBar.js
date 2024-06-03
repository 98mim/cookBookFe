import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CustomButton from "./CustomButton";
import CustomFilterSideBar from "./CustomFilterSideBar";

const CustomFilterBar = ({
  handleDataChange,
  filterData,
  isOpen,
  setIsOpen,
}) => {
  const { t } = useTranslation();

  const handleOpenDrawer = () => {
    setIsOpen(true);
    console.log("opening" + isOpen);
  };

  return (
    <div className={"w-full p-3"}>
      <CustomButton
        text={t("Filter.openButton")}
        onClick={handleOpenDrawer}
        className={"w-full"}
      />
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
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CustomFilterBar;
