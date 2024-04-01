import CustomDropdown from "./CustomDropdown";
import CustomTextInput from "./CustomTextInput";
import { Button } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import React from "react";
import PropTypes from "prop-types";

const IngredientMapper = ({
  ingredients,
  foodData,
  handleChange,
  handleDelete,
}) => {
  return ingredients.map((ingredient, i) => (
    <div
      key={"i" + i.toString()}
      className="flex flex-row w-full items-center gap-4 mx-5 md:gap-2 pr-10"
    >
      <div className={"w-2/6 flex justify-center "}>
        <CustomDropdown
          data={foodData}
          label={ingredient?.food?.name || "Pick new ingredient"}
          onDataChange={(name, value) => handleChange(i, name, value)}
          fieldName="food"
        />
      </div>
      <div className={"w-1/6"}>
        <CustomTextInput
          fieldName="weight"
          label="Weight"
          isRequired={true}
          onDataChange={(name, value) => handleChange(i, name, value)}
          type="number"
          data={ingredient?.weight || 0}
        />
      </div>
      <div className={"w-2/6"}>
        <CustomTextInput
          fieldName="weightUnit"
          label="Choose weight type"
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
