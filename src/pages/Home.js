import { useEffect, useState } from "react";
//import { get } from "../util/ApiUtil";
import CustomCard from "../components/CustomCard";
import request from "../util/Api";
import { useTranslation } from "react-i18next";
import CustomFilterBar from "../components/CustomFilterBar";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    ingredients: [],
    overallTime: 0,
    name: "",
    difficulty: null,
    courseType: null,
  });

  const handleDataChange = (name, value) => {
    console.log(name + ": " + value);
    setFilter((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    request
      .get("/book/all")
      .then((response) => {
        setRecipes(response.data.content);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    request
      .post("/book/filter", filter)
      .then((response) => {
        setRecipes(response.data.content);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [filter]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
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
          <div>
            <CustomFilterBar
              handleDataChange={handleDataChange}
              filterData={filter}
            />
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

export default Home;
