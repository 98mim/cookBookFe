import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";
import request from "../util/Api";
import { useNavigate } from "react-router-dom";
import IngredientForm from "../components/form/IngredientForm";
import CustomTextInput from "../components/form/CustomTextInput";
import MethodForm from "../components/form/MethodForm";
import Thumbnail from "../components/form/Thumbnail";
import CustomButton from "../components/CustomButton";
import { HiOutlineClock } from "react-icons/hi";
import { GiCook, GiCookingGlove, GiCookingPot } from "react-icons/gi";
import { useTranslation } from "react-i18next";

function RecipeAdd() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    prepTime: 0,
    overallTime: 0,
    cookTime: 0,
    bakeTime: 0,
    ingredients: [
      {
        weight: 0,
        weightUnit: "",
        food: {},
      },
    ],
    methods: [
      {
        order: 1,
        body: "",
      },
    ],
  });
  const [ingredients, setIngredients] = useState([]);
  const toastId = useRef(null);

  useEffect(() => {
    request
      .get(`/food/all`)
      .then((response) => {
        setIngredients(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      overallTime:
        parseInt(prevData.cookTime) +
        parseInt(prevData.bakeTime) +
        parseInt(prevData.prepTime),
    }));
  }, [formData.cookTime, formData.bakeTime, formData.prepTime]);

  const handleDataChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");

    toastId.current = toast("Loading...", {
      ...toastOptions,
      autoClose: false,
    });
    try {
      const response = await request.post("/recipe/add", formData);
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center xl:m-0 p-2 w-full">
          <div className="flex flex-col xl:w-3/4 w-full p-2 xl:p-0">
            <div className="flex xl:mt-2 items-center justify-center">
              <h1 className="text-9xl m-4 mt-6 font-blackline text-center">
                {t("Recipe.addingNewRecipe")}
                {formData.name && ": " + formData.name}
              </h1>
            </div>
            <form className="flex flex-col gap-4 m-2" onSubmit={handleSubmit}>
              <div
                className={
                  "bg-purple-50 m-1 px-2 pt-2 rounded-lg shadow-purple-300 shadow-xl gap-4"
                }
              >
                <CustomTextInput
                  fieldName={"name"}
                  label={t("Recipe.name")}
                  isRequired={true}
                  onDataChange={handleDataChange}
                  data={formData[name]}
                />
                <Thumbnail
                  name={"image"}
                  defaultValue={formData.image}
                  urlName={"thumbnail_link"}
                  onSelect={(name, value) => handleDataChange(name, value)}
                />
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
                      {formData.overallTime} min
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
                        fieldName={"prepTime"}
                        onDataChange={handleDataChange}
                        data={formData.prepTime}
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
                        fieldName={"bakeTime"}
                        onDataChange={handleDataChange}
                        data={formData.bakeTime}
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
                        fieldName={"cookTime"}
                        onDataChange={handleDataChange}
                        data={formData.cookTime}
                        type={"number"}
                      />{" "}
                      min
                    </div>
                  </div>
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
