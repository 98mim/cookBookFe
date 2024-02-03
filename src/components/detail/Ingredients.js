import React from "react";
import PropTypes from "prop-types";
import { List } from "flowbite-react";

const Ingredients = ({ ingredients }) => {
  const setWeightUnit = (weightUnit) => {
    let shortcut;
    switch (weightUnit) {
      case "KILOGRAMS":
        shortcut = "kg";
        break;
      case "GRAMS":
        shortcut = "g";
        break;
    }
    return shortcut;
  };
  return (
    <>
      <div className="w-full">
        <h2 className="font-gistesy text-7xl m-2">Ingredients</h2>
        <List unstyled>
          {ingredients.map((ingredient, index) => (
            <List.Item key={index}>
              <div className="flex flex-row justify-between m-3">
                <div>{ingredient.food.name}</div>
                <div>
                  {ingredient.weight} {setWeightUnit(ingredient.weightUnit)}
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf.isRequired,
};

export default Ingredients;
