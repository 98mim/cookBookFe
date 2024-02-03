import React, { useEffect, useState } from "react";
import { get } from "../util/ApiUtil";
import { useParams } from "react-router-dom";
import RecipeHeader from "../components/detail/RecipeHeader";
import Ingredients from "../components/detail/Ingredients";
import Method from "../components/detail/Method";

function RecipeDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    get(`/recipe/detail/${id}`)
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center">
          {recipe && <RecipeHeader detail={recipe}></RecipeHeader>}
          <div className="flex md:flex-row flex-col xl:w-3/4 w-full">
            <div className="flex w-full md:w-1/2 lg:w-1/4">
              {recipe && recipe.ingredients ? (
                <Ingredients ingredients={recipe.ingredients}></Ingredients>
              ) : (
                <div>No ingredients found for this recipe</div>
              )}
            </div>
            <div className="flex sm:w-full md:w-1/2 lg:w-3/4">
              <Method method={recipe.methods}> </Method>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeDetail;
