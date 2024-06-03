import CustomCard from "../components/CustomCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import request from "../util/Api";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";

function RecipesCourseType() {
  const { type } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    request
      .get(`/book/course_type/${type}`)
      .then((response) => {
        setRecipes(response.data.content);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [type]);

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="px-2">
          <div className="flex flex-col items-center">
            <img src="/logo_pozdlzne.jpeg" className="mr-3 h-20" alt="Logo" />
            <h2 className="font-blackline text-7xl p-2">
              {t("Home.welcomePart1")}
            </h2>
            <h1 className="font-blackline text-9xl p-10">
              {t("Home.welcomePart2")}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <CustomCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default RecipesCourseType;
