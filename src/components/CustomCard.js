import { Card } from "flowbite-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { HiClock, HiPencil } from "react-icons/hi";
import { GiCook, GiCookingGlove, GiCookingPot } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const CustomCard = ({ recipe, update }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCardClick = (event) => {
    event.stopPropagation();
    navigate(`/recipe/${recipe.id}`);
  };

  const handleRecipeUpdate = (event) => {
    event.stopPropagation();
    navigate(`/recipe/update/${recipe.id}`);
  };

  return (
    <Card
      className="relative w-full p-2 flex " // Adjust the width for different screen sizes
      imgAlt="recipes photo"
      imgSrc={`http://localhost:8080/image/${recipe.imagePath}`}
      onClick={handleCardClick}
    >
      {update && (
        <HiPencil
          size={24}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg cursor-pointer"
          onClick={handleRecipeUpdate}
        />
      )}

      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {recipe.name}
      </h5>
      <div className="flex justify-between w-full items-center md:flex-col">
        <div className={"flex md:flex-row"}>
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div>
                <HiClock size={24} />
              </div>
              <div className="text-md sm:text-lg text-center">
                {t("Time.overall")}
              </div>
            </div>
            <div className="text-2xl md:text-3xl m-2">
              {recipe.overallTime} min
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center">
              <div>
                <GiCook size={24} />
              </div>
              <div className="text-md sm:text-lg text-center">
                {t("Time.prep")}
              </div>
            </div>
            <div className="text-2xl md:text-3xl m-2">
              {recipe.prepTime} min
            </div>
          </div>
        </div>

        <div className={"flex md:flex-row"}>
          {recipe.bakeTime > 0 && (
            <div className="flex flex-row items-center">
              <div className="flex flex-col items-center">
                <div>
                  <GiCookingGlove size={24} />
                </div>
                <div className="text-md sm:text-lg text-center">
                  {t("Time.bake")}
                </div>
              </div>
              <div className="text-2xl md:text-3xl m-2">
                {recipe.bakeTime} min
              </div>
            </div>
          )}

          {recipe.cookTime > 0 && (
            <div className="flex flex-row items-center">
              <div className="flex flex-col items-center">
                <div>
                  <GiCookingPot size={24} />
                </div>
                <div className="text-md sm:text-lg text-center">
                  {t("Time.cook")}
                </div>
              </div>
              <div className="text-2xl md:text-3xl m-2">
                {recipe.cookTime} min
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

CustomCard.propTypes = {
  recipe: PropTypes.object,
  update: PropTypes.bool,
};

export default CustomCard;
