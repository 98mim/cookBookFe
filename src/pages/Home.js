// Home.js
import CustomNavbar from "../components/CustomNavbar";
import { useEffect, useState } from "react";
import { get } from "../util/ApiUtil";
import CustomCard from "../components/CustomCard";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    get("/book/all")
      .then((data) => {
        setRecipes(data.content);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <CustomNavbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="px-2">
          <div className="flex flex-col items-center">
            <img src="/logo_pozdlzne.jpeg" className="mr-3 h-20" alt="Logo" />
            <h2 className="font-gistesy text-7xl p-2">Welcome to</h2>
            <h1 className="font-gistesy text-9xl p-10">Be Your Chef</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 lg:grid-cols-3">
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
