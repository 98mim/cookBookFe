import React, { useReducer } from "react";
import PropTypes from "prop-types";
import IngredientMapper from "./IngredientMapper";
import CustomButton from "../CustomButton";

const reducer = (ingredients, action) => {
  switch (action.type) {
    case "addIngredient":
      return [...ingredients, action.newIngredient];
    case "updateIngredient":
      return [...action.updatedIngredients];
    default:
      return ingredients;
  }
};

const IngredientForm = ({ foodData, handleDataChange, ingredientsData }) => {
  const [ingredients, dispatch] = useReducer(reducer, ingredientsData);

  const handleButtonClick = () => {
    dispatch({
      type: "addIngredient",
      newIngredient: { weight: 0, weightUnit: "", food: {} },
    });
    handleDataChange("ingredients", ingredients);
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
      <h2 className="font-gistesy text-7xl m-2 ml-5">Ingredients</h2>

      <IngredientMapper
        ingredients={ingredients}
        handleChange={handleChange}
        handleDelete={handleDelete}
        foodData={foodData}
      />
      <CustomButton
        text={"Add Ingredient"}
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
