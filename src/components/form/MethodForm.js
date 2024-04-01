import React, { useReducer } from "react";
import { Timeline } from "flowbite-react";
import PropTypes from "prop-types";
import CustomTextArea from "./CustomTextArea";
import CustomTimelineItem from "../CustomTimelineItem";
import CustomButton from "../CustomButton";

const reducer = (methods, action) => {
  switch (action.type) {
    case "addMethod":
      return [...methods, action.newMethod];
    //case "updateMethod":
    //return [...action.updatedMethods];
    default:
      return methods;
  }
};

const MethodForm = ({ methodData, handleDataChange }) => {
  const [methods, dispatch] = useReducer(
    reducer,
    methodData.sort((a, b) => a.order - b.order),
  );
  let count = methods.length;

  const handleButtonClick = () => {
    count += 1;
    dispatch({
      type: "addMethod",
      newMethod: { order: count, body: "" },
    });
    handleDataChange("methods", methods);
  };

  const handleChange = (index, value) => {
    console.log(value);
    const updatedMethods = [...methods];
    updatedMethods[index].body = value;
    dispatch({
      type: "updateMethod",
      updatedMethods: updatedMethods,
    });
    handleDataChange("methods", updatedMethods);
  };

  return (
    <div className={"flex flex-col w-full"}>
      <h2 className="font-gistesy text-7xl m-2 ml-5">Method</h2>
      <Timeline className="m-4">
        {methods.map((method, index) => (
          <div key={"m" + index.toString()} className={"mx-5"}>
            <CustomTimelineItem
              body={
                <CustomTextArea
                  fieldName="body"
                  defaultValue={method.body}
                  onDataChange={(name, value) => handleChange(index, value)}
                  placeholder={"Method description"}
                />
              }
              index={(index + 1).toString()}
            ></CustomTimelineItem>
          </div>
        ))}
      </Timeline>
      <CustomButton
        text={"Add Method"}
        className={"flex flex-wrap m-5 max-w-fit"}
        onClick={handleButtonClick}
      />
    </div>
  );
};

MethodForm.propTypes = {
  methodData: PropTypes.array,
  handleDataChange: PropTypes.func,
};

export default MethodForm;
