// CustomCard.js
import { Card } from "flowbite-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { HiOutlineClock } from "react-icons/hi";

const CustomCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card
      className="w-full p-2" // Adjust the width for different screen sizes
      imgAlt="recipes photo"
      imgSrc={`http://localhost:8080/image/${recipe.imagePath}`}
      onClick={handleCardClick}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {recipe.name}
      </h5>
      <p className="flex flex-row font-normal text-gray-700 dark:text-gray-400">
        <HiOutlineClock /> {recipe.overallTime}
      </p>
    </Card>
  );
};

CustomCard.propTypes = {
  recipe: PropTypes.object,
};

export default CustomCard;
