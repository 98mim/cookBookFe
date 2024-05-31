import { Dropdown, Label, TextInput } from "flowbite-react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import request from "../../util/Api";
import { HiChevronDown, HiOutlineSearch } from "react-icons/hi";
import PropTypes from "prop-types";
import BadgeTrigger from "../form/BadgeTrigger";

const IngredientFilterSelect = ({ selectedData, onDataChange }) => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    request
      .get(`/food/all`)
      .then((response) => {
        setIngredients(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const [selectedItems, setSelectedItems] = useState(selectedData || []);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchInput(value);
  };

  const filteredOptions = ingredients.filter((option) =>
    option.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleItemClick = (option) => {
    const newSelectedItems = selectedItems.includes(option.name)
      ? selectedItems.filter((item) => item !== option.name)
      : [...selectedItems, option.name];

    setSelectedItems(newSelectedItems);
    setSearchInput("");
    onDataChange("ingredients", newSelectedItems);
  };

  const handleRemove = (valueToRemove, event) => {
    event.stopPropagation();
    const newSelectedValues = selectedItems.filter(
      (value) => value !== valueToRemove,
    );
    setSelectedItems(newSelectedValues);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="mb-2 block">
            <Label value={t("Recipe.ingredients")}> </Label>
          </div>
          <Dropdown
            label={t("Recipe.ingredients")}
            color={"light"}
            onToggle={() => setDropdownOpen(!dropdownOpen)}
            renderTrigger={() => (
              <div
                className={`flex items-center justify-between  rounded-md border  bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-3 `}
              >
                <BadgeTrigger
                  selectedValues={selectedItems}
                  label={t("Recipe.ingredients")}
                  handleRemove={handleRemove}
                />

                <span>
                  <HiChevronDown size={16} />
                </span>
              </div>
            )}
          >
            <Dropdown.Header>
              <TextInput
                id="search"
                name="search"
                type="text"
                icon={HiOutlineSearch}
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyDown={(event) => event.stopPropagation()}
              />
            </Dropdown.Header>
            {filteredOptions.map((option, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleItemClick(option)}
                className={
                  selectedItems.includes(option.name)
                    ? "bg-blue-500 text-white"
                    : ""
                }
              >
                {option.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      )}
    </>
  );
};

IngredientFilterSelect.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  selectedData: PropTypes.array,
};

export default IngredientFilterSelect;
