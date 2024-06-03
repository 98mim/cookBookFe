import { useEffect, useState } from "react";
import request from "../util/Api";
import CustomCard from "../components/CustomCard";
import LoadingComponent from "../components/LoadingComponent";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    request
      .get("/profile/me")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className={"flex flex-col items-center m-1"}>
          <h1 className={"flex items-center text-9xl m-4 mt-6 font-blackline"}>
            {data?.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            {data.recipes.map((recipe) => (
              <CustomCard key={recipe.id} recipe={recipe} update={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
