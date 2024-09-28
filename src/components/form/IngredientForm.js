import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import IngredientMapper from "./IngredientMapper";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";

const reducer = (ingredients, action) => {
  switch (action.type) {
    case "addIngredient":
      return [...ingredients, action.newIngredient];
    case "updateIngredient":
      return [...action.updatedIngredients];
    case "setIngredients":
      return [...action.ingredients];
    default:
      return ingredients;
  }
};

const IngredientForm = ({ foodData, handleDataChange, ingredientsData }) => {
  const [ingredients, dispatch] = useReducer(reducer, ingredientsData);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch({
      type: "setIngredients",
      ingredients: ingredientsData,
    });
  }, [ingredientsData]);

  const handleButtonClick = () => {
    const newIngredient = { weight: 0, weight_unit: "", food: {} };
    dispatch({
      type: "addIngredient",
      newIngredient,
    });
    handleDataChange("ingredients", [...ingredients, newIngredient]);
  };

  const handleChange = (index, name, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][name] = value;
    dispatch({
      type: "updateIngredient",
      updatedIngredients: updatedIngredients,
    });
    handleDataChange("ingredients", updatedIngredients);
  };

  const handleDelete = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    dispatch({
      type: "updateIngredient",
      updatedIngredients: updatedIngredients,
    });
    handleDataChange("ingredients", updatedIngredients);
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="font-gistesy text-7xl m-2 ml-5">
        {t("Recipe.ingredients")}
      </h2>

      <IngredientMapper
        ingredients={ingredients}
        handleChange={handleChange}
        handleDelete={handleDelete}
        foodData={foodData}
      />
      <CustomButton
        text={t("Button.addIngredient")}
        className={"flex flex-wrap m-5 max-w-fit"}
        onClick={handleButtonClick}
      />
    </div>
  );
};

IngredientForm.propTypes = {
  foodData: PropTypes.array,
  handleDataChange: PropTypes.func,
  ingredientsData: PropTypes.array,
};

export default IngredientForm;
