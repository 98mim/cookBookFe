import { useEffect, useState } from "react";
import CustomCard from "../components/CustomCard";
import request from "../util/Api";
import { useTranslation } from "react-i18next";
import CustomFilterBar from "../components/CustomFilterBar";
import { Pagination } from "flowbite-react";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const { t } = useTranslation();
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default value

  const [filter, setFilter] = useState({
    ingredients: [],
    overallTime: 0,
    prepTime: 0,
    cookTime: 0,
    bakeTime: 0,
    name: "",
    difficulty: null,
    courseType: null,
  });

  useEffect(() => {
    // Function to determine the number of items per page based on screen size
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(15); // 3 columns x 5 rows
      } else if (width >= 768) {
        setItemsPerPage(10); // 2 columns x 5 rows
      } else {
        setItemsPerPage(5); // 1 column x 5 rows
      }
    };

    updateItemsPerPage(); // Initial call
    window.addEventListener("resize", updateItemsPerPage); // Update on resize

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // Cleanup on unmount
    };
  }, []);

  const handleDataChange = (name, value) => {
    console.log(name + ": " + value);
    setFilter((prevData) => ({ ...prevData, [name]: value }));
  };

  const onPageChange = (page) => {
    console.log(filter);
    console.log("on page change " + (page - 1));
    fetchRecipes(page - 1, itemsPerPage);
  };

  const fetchRecipes = (page = 0, itemsPerPage) => {
    setIsLoading(true);
    const endpoint =
      filter &&
      Object.values(filter).some(
        (val) => val !== null && val !== "" && val !== 0 && val.length !== 0,
      )
        ? "/book/filter"
        : "/book/all";
    const requestData =
      endpoint === "/book/filter"
        ? { ...filter, page, size: itemsPerPage }
        : { page, size: itemsPerPage };

    const requestMethod =
      endpoint === "/book/filter" ? request.post : request.get;

    requestMethod(endpoint + `?page=${page}&size=${itemsPerPage}`, requestData)
      .then((response) => {
        setRecipes(response.data.content);
        setAllPage(response.data.totalPages);
        setCurrentPage(response.data.pageable.pageNumber);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes(currentPage, itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    request
      .post("/book/filter", filter)
      .then((response) => {
        setRecipes(response.data.content);
        setAllPage(response.data.totalPages);
        setCurrentPage(response.pageable.pageNumber);
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
          <CustomFilterBar
            handleDataChange={handleDataChange}
            filterData={filter}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <CustomCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage + 1}
              totalPages={allPage}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
