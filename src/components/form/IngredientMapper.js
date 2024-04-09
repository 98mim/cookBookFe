import CustomDropdown from "./CustomDropdown";
import CustomTextInput from "./CustomTextInput";
import { Button } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const IngredientMapper = ({
  ingredients,
  foodData,
  handleChange,
  handleDelete,
}) => {
  const { t } = useTranslation();

  return ingredients.map((ingredient, i) => (
    <div
      key={"i" + i.toString()}
      className="flex flex-row w-full items-center gap-4 mx-5 md:gap-2 pr-10"
    >
      <div className={"w-2/6 flex justify-center "}>
        <CustomDropdown
          data={foodData}
          label={ingredient?.food?.name || t("Recipe.pickNewIngredient")}
          onDataChange={(name, value) => handleChange(i, name, value)}
          fieldName="food"
        />
      </div>
      <div className={"w-1/6"}>
        <CustomTextInput
          fieldName={"weight"}
          label={t("Recipe.weight")}
          isRequired={true}
          onDataChange={(name, value) => handleChange(i, name, value)}
          type={"number"}
          data={ingredient?.weight || 0}
        />
      </div>
      <div className={"w-2/6"}>
        <CustomTextInput
          fieldName={"weightUnit"}
          label={t("Recipe.weightUnit")}
          placeholder={t("Recipe.chooseWeightType")}
          isRequired={true}
          onDataChange={(name, value) => handleChange(i, name, value)}
          data={ingredient.weightUnit || ""}
        />
      </div>
      <div className={"w-1/6"}>
        <Button
          pill
          outline
          gradientDuoTone="purpleToPink"
          onClick={() => handleDelete(i)}
        >
          <HiOutlineTrash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ));
};

IngredientMapper.propTypes = {
  foodData: PropTypes.array,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
  ingredients: PropTypes.array,
};
export default IngredientMapper;
