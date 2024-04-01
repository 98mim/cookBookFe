import { Button } from "flowbite-react";
import PropTypes from "prop-types";

const CustomButton = ({ text, className, onClick }) => {
  return (
    <Button
      pill
      outline
      gradientDuoTone="purpleToPink"
      className={className}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomButton;
