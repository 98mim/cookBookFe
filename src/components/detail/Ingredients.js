import React from "react";
import PropTypes from "prop-types";
import { List } from "flowbite-react";

const Ingredients = ({ ingredients }) => {
  return (
    <>
      <div className="sm:w-full md:w-1/3">
        <List unstyled>
          {ingredients.map((ingredient, index) => (
            <List.Item key={index}>
              {ingredient.weight} {ingredient.weightUnit} {ingredient.food.name}
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
