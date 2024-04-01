import PropTypes from "prop-types";
import { HiOutlineClock } from "react-icons/hi";
import { GiCook, GiCookingGlove, GiCookingPot } from "react-icons/gi";

const RecipeHeader = ({ detail }) => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <h1 className="flex items-center text-9xl m-4 mt-6 font-blackline">
        {detail.name}
      </h1>
      <img
        src={`http://localhost:8080/image/${detail.imagePath}`}
        className="w-full lg:w-3/4 max-h-1/2"
      />
      <div className="flex justify-between w-full lg:w-3/4">
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <div>
              <HiOutlineClock size={24} />
            </div>
            <div className="text-md sm:text-lg">Overall Time</div>
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
            {detail.overallTime} min
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <div>
              <GiCook size={24} />
            </div>
            <div className="text-md sm:text-lg">Prep Time</div>
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
            {detail.prepTime} min
          </div>
        </div>

        {detail.bakeTime > 0 && (
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center">
              <div>
                <GiCookingGlove size={24} />
              </div>
              <div className="text-md sm:text-lg">Bake Time</div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
              {detail.bakeTime} min
            </div>
          </div>
        )}

        {detail.cookTime > 0 && (
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center">
              <div>
                <GiCookingPot size={24} />
              </div>
              <div className="text-md sm:text-lg">Cook Time</div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
              {detail.cookTime} min
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

RecipeHeader.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default RecipeHeader;
