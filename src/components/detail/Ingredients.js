import React from "react";
import PropTypes from "prop-types";
import { List } from "flowbite-react";
import { useTranslation } from "react-i18next";

const Ingredients = ({ ingredients }) => {
  const { t } = useTranslation();

  const setWeightUnit = (weightUnit) => {
    let shortcut = weightUnit;
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
        <h2 className="font-gistesy text-7xl m-2">{t("Recipe.ingredients")}</h2>
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
  ingredients: PropTypes.array.isRequired,
};

export default Ingredients;
