import { Progress } from "flowbite-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React from "react";

const ProgressBarDifficulty = ({ data }) => {
  const { t } = useTranslation();

  const getPercentages = (data) => {
    switch (data) {
      case "VERY_EASY":
        return 0;
      case "EASY":
        return 25;
      case "MEDIUM":
        return 50;
      case "DIFFICULT":
        return 75;
      case "VERY_DIFFICULT":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className={"w-3/4"}>
      <h2 className="font-blackline text-4xl m-2">
        {t("Recipe.difficulty")} - {t("Difficulty." + data)}
      </h2>
      <Progress progress={getPercentages(data)} size={"lg"} />
    </div>
  );
};

ProgressBarDifficulty.propTypes = {
  data: PropTypes.string,
};
export default ProgressBarDifficulty;
