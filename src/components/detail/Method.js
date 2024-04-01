import React from "react";
import PropTypes from "prop-types";
import { Timeline } from "flowbite-react";
import "react-icons/tb";
import CustomTimelineItem from "../CustomTimelineItem";

const Method = ({ method }) => {
  return (
    <div className="w-full">
      <h2 className="font-gistesy text-7xl m-2">Method</h2>
      <Timeline className="m-4">
        {method.map((point, index) => (
          <CustomTimelineItem
            key={index.toString()}
            body={point.body}
            index={(index + 1).toString()}
          ></CustomTimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

Method.propTypes = {
  method: PropTypes.array.isRequired,
};

export default Method;
