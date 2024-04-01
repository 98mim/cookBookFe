import { Button, Dropdown, TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import PropTypes from "prop-types";
import { useState } from "react";

const CustomDropdown = ({ fieldName, data, label, onDataChange }) => {
  const [selectedItem, setSelectedItem] = useState(label);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchInput(value);
  };

  const filteredOptions = data.filter((option) =>
    option.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleButtonClick = (searchInput) => {
    const option = {
      name: searchInput,
    };
    handleItemClick(option);
  };

  const handleItemClick = (option) => {
    setSelectedItem(option.name);
    setSearchInput("");
    onDataChange(fieldName, option);
  };

  return (
    <div>
      <Dropdown label={selectedItem} inline>
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
          <Dropdown.Item key={index} onClick={() => handleItemClick(option)}>
            {option.name}
          </Dropdown.Item>
        ))}
        <Dropdown.Item>
          <Button onClick={() => handleButtonClick(searchInput)}>
            Add as new
          </Button>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

CustomDropdown.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  onDataChange: PropTypes.func,
  fieldName: PropTypes.string,
};
export default CustomDropdown;
