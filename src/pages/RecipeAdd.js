import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";
import request from "../util/Api";
import { useNavigate, useParams } from "react-router-dom";
import IngredientForm from "../components/form/IngredientForm";
import CustomTextInput from "../components/form/CustomTextInput";
import MethodForm from "../components/form/MethodForm";
import Thumbnail from "../components/form/Thumbnail";
import CustomButton from "../components/CustomButton";
import { HiOutlineClock } from "react-icons/hi";
import { GiCook, GiCookingGlove, GiCookingPot } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import CustomDifficultySelector from "../components/form/CustomDifficultySelector";
import CustomCourseSelector from "../components/form/CustomCourseSelector";
import LoadingComponent from "../components/LoadingComponent";

function RecipeAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingId, setIsLoadingId] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    prep_time: 0,
    overall_time: 0,
    cook_time: 0,
    bake_time: 0,
    difficulty: "MEDIUM",
    course_type: "BREAKFAST",
    ingredients: [
      {
        weight: 0,
        weight_unit: "",
        food: {},
      },
    ],
    methods: [
      {
        order_number: 1,
        body: "",
      },
    ],
  });
  const [ingredients, setIngredients] = useState([]);
  const toastId = useRef(null);

  useEffect(() => {
    request
      .get(`/api/food/all`)
      .then((response) => {
        setIngredients(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      overall_time:
        parseInt(prevData.cook_time) +
        parseInt(prevData.bake_time) +
        parseInt(prevData.prep_time),
    }));
  }, [formData.cook_time, formData.bake_time, formData.prep_time]);

  useEffect(() => {
    request
      .get(`/api/recipe/${id}`)
      .then((response) => {
        if (id != null) {
          setFormData(response.data);
          console.log(response.data);
        }
        setIsLoadingId(false);
      })
      .catch((error) => console.error(error));
  }, [id]);
  const handleDataChange = (name, value) => {
    console.log(formData);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    toastId.current = toast("Loading...", {
      ...toastOptions,
      autoClose: false,
    });
    try {
      let response = null;
      if (id == null) {
        response = await request.post("/api/recipe/add", formData);
      } else {
        response = await request.post(`/api/recipe/update/${id}`, formData);
      }
      toast.update(toastId.current, {
        ...toastOptions,
        render: "Submit successfully",
        type: "success",
      });
      navigate("/recipe/" + response.data.id);
    } catch (error) {
      toast.update(toastId.current, {
        ...toastOptions,
        render: "Something went wrong",
        type: "error",
      });
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && isLoadingId ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-col items-center xl:m-0 p-2 w-full">
          <div className="flex flex-col xl:w-3/4 w-full p-2 xl:p-0">
            <div className="flex xl:mt-2 items-center justify-center">
              <h1 className="text-9xl m-4 mt-6 font-blackline text-center">
                {id == null && t("Recipe.addingNewRecipe")}
                {id == null && formData.name && ": " + formData.name}
                {id != null && formData.name && formData.name}
              </h1>
            </div>
            <form className="flex flex-col gap-4 m-2" onSubmit={handleSubmit}>
              <div
                className={
                  "flex flex-col bg-purple-50 m-1 px-2 pt-2 rounded-lg shadow-purple-300 shadow-xl gap-4"
                }
              >
                <CustomTextInput
                  fieldName={"name"}
                  label={t("Recipe.name")}
                  isRequired={true}
                  onDataChange={handleDataChange}
                  data={formData.name}
                />
                <div className="flex row w-full max-h-1/2 justify-center">
                  {formData.image_path == null && (
                    <Thumbnail
                      name={"image"}
                      defaultValue={formData.image}
                      urlName={"thumbnail_link"}
                      onSelect={(name, value) => handleDataChange(name, value)}
                    />
                  )}
                  {formData.image_path && (
                    <img
                      src={`http://localhost:8000${formData.image_path}`}
                      alt={"recipe image"}
                    />
                  )}{" "}
                </div>
                <div className="flex justify-between w-full sm:flex-row flex-col">
                  <div className="flex flex-row items-center text-center">
                    <div className="flex flex-col items-center">
                      <div>
                        <HiOutlineClock size={24} />
                      </div>
                      <div className="text-md sm:text-lg">
                        {t("Time.overall")}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
                      {formData.overall_time} min
                    </div>
                  </div>

                  <div className="flex flex-row items-center text-center">
                    <div className="flex flex-col items-center">
                      <div>
                        <GiCook size={24} />
                      </div>
                      <div className="text-md sm:text-lg">{t("Time.prep")}</div>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
                      <CustomTextInput
                        fieldName={"prep_time"}
                        onDataChange={handleDataChange}
                        data={formData.prep_time}
                        type={"number"}
                      />{" "}
                      min
                    </div>
                  </div>

                  <div className="flex flex-row items-center text-center">
                    <div className="flex flex-col items-center">
                      <div>
                        <GiCookingGlove size={24} />
                      </div>
                      <div className="text-md sm:text-lg">{t("Time.bake")}</div>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
                      <CustomTextInput
                        fieldName={"bake_time"}
                        onDataChange={handleDataChange}
                        data={formData.bake_time}
                        type={"number"}
                      />{" "}
                      min
                    </div>
                  </div>
                  <div className="flex flex-row items-center text-center">
                    <div className="flex flex-col items-center">
                      <div>
                        <GiCookingPot size={24} />
                      </div>
                      <div className="text-md sm:text-lg">{t("Time.cook")}</div>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2">
                      <CustomTextInput
                        fieldName={"cook_time"}
                        onDataChange={handleDataChange}
                        data={formData.cook_time}
                        type={"number"}
                      />{" "}
                      min
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col w-full">
                <div
                  className={
                    "flex w-full lg:w-1/2 bg-purple-50 m-1 py-2 rounded-lg shadow-purple-300 shadow-xl"
                  }
                >
                  <CustomDifficultySelector
                    onDataChange={handleDataChange}
                    data={formData.difficulty}
                  />
                </div>
                <div
                  className={
                    "flex w-full lg:w-1/2 bg-purple-50 m-1 py-2 rounded-lg shadow-purple-300 shadow-xl"
                  }
                >
                  <CustomCourseSelector
                    onDataChange={handleDataChange}
                    data={formData.course_type}
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col w-full">
                {ingredients && (
                  <div className="flex w-full lg:w-1/2 bg-purple-50 m-1 py-2 rounded-lg shadow-purple-300 shadow-xl">
                    <IngredientForm
                      foodData={ingredients}
                      handleDataChange={handleDataChange}
                      ingredientsData={formData.ingredients}
                    />
                  </div>
                )}
                <div className="flex w-full lg:w-1/2 bg-purple-50 m-1 pl-2 py-2 rounded-lg shadow-purple-300 shadow-xl">
                  <MethodForm
                    methodData={formData.methods}
                    handleDataChange={handleDataChange}
                  />
                </div>
              </div>
              <CustomButton text={t("Button.submit")} onClick={handleSubmit} />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeAdd;
