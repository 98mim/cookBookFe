import React, { useState } from "react";
import { Badge, Label } from "flowbite-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { difficulty } from "../../util/Difficulty";

const CustomDifficultySelector = ({ onDataChange, data = "Medium" }) => {
  const { t } = useTranslation();
  const difficultyLabels = difficulty;

  const mapLabelToValue = (label) => {
    return difficultyLabels.indexOf(label); // Get the index of the label
  };

  const mapValueToLabel = (value) => {
    return difficultyLabels[value]; // Get the label at the specified index
  };

  const mapValueToAccentColor = (value) => {
    switch (value) {
      case 0:
        return "accent-green-200 active:accent-green-200 hover:accent-green-200";
      case 1:
        return "accent-green-500 active:accent-green-500 hover:accent-green-500";
      case 2:
        return "accent-yellow-200 active:accent-yellow-200 hover:accent-yellow-200";
      case 3:
        return "accent-orange-500 active:accent-orange-500 hover:accent-orange-500";
      case 4:
        return "accent-red-500 active:accent-red-500 hover:accent-red-500 ";
      default:
        return "";
    }
  };

  const [value, setValue] = useState(mapLabelToValue(data));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(value);
    onDataChange(name, mapValueToLabel(value));
  };

  return (
    <div className={"w-full h-24"}>
      <div className="pl-2 mb-2 block">
        <Label value={t("Recipe.chooseDifficulty") + ":"}></Label>
        <span className="ml-1 text-red-500">*</span>
      </div>
      <div className={"pl-7 pr-10"}>
        <input
          type="range"
          name={"difficulty"}
          min={0}
          max={4}
          step={1}
          value={value}
          onChange={handleChange}
          className={`appearance-auto h-3 w-full cursor-pointer rounded-lg border-transparent  ${mapValueToAccentColor(value)} bg-gray-100 hoover:bg-gray-100 active:bg-gray-100`}
        />
      </div>
      <div className={"flex flex-row pl-7 pr-10 w-full justify-between"}>
        <div className={"relative h-45"}>
          <Badge className={"absolute -left-3"}>
            {t("Difficulty.VERY_EASY")}
          </Badge>
        </div>
        <div className={"relative"}>
          <Badge className={"absolute -right-6"}>{t("Difficulty.EASY")}</Badge>
        </div>
        <div className={"relative"}>
          <Badge className={"absolute -left-7"}>{t("Difficulty.MEDIUM")}</Badge>
        </div>
        <div className={"relative"}>
          <Badge className={"absolute -left-7"}>
            {t("Difficulty.DIFFICULT")}
          </Badge>
        </div>
        <div className={"relative"}>
          <Badge className={"absolute -left-7"}>
            {t("Difficulty.VERY_DIFFICULT")}
          </Badge>
        </div>
      </div>
    </div>
  );
};

CustomDifficultySelector.propTypes = {
  onDataChange: PropTypes.func,
  data: PropTypes.string,
};

export default CustomDifficultySelector;
