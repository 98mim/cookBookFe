import PropTypes from "prop-types";
import { HiFire, HiOutlineClock } from "react-icons/hi";

const RecipeHeader = ({ detail }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="flex items-center text-9xl mb-4 font-gistesy">
        {detail.name}
      </h1>
      <img
        src={`http://localhost:8080/image/${detail.imagePath}`}
        className="w-3/4 max-h-1/2"
      />
      <div className="flex justify-between w-3/4">
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <div>
              <HiOutlineClock size={24} />
            </div>
            <div className="text-lg">Overall</div>
          </div>
          <div className="text-5xl m-2">{detail.overallTime} min</div>
        </div>

        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <div>
              <HiFire size={24} />
            </div>
            <div className="text-lg">Prep Time</div>
          </div>
          <div className="text-5xl m-2">{detail.prepTime} min</div>
        </div>

        {detail.bakeTime > 0 && (
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center">
              <div>
                <HiFire size={24} />
              </div>
              <div className="text-lg">Bake Time</div>
            </div>
            <div className="text-5xl m-2">{detail.bakeTime} min</div>
          </div>
        )}

        {detail.cookTime > 0 && (
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center">
              <div>
                <HiFire size={24} />
              </div>
              <div className="text-lg">Cook Time</div>
            </div>
            <div className="text-5xl m-2">{detail.cookTime} min</div>
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
