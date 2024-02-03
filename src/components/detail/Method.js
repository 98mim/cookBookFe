import React from "react";
import PropTypes from "prop-types";
import { Timeline } from "flowbite-react";
import "react-icons/tb";
import {
  TbNumber10Small,
  TbNumber1Small,
  TbNumber2Small,
  TbNumber3Small,
  TbNumber4Small,
  TbNumber5Small,
  TbNumber6Small,
  TbNumber7Small,
  TbNumber8Small,
  TbNumber9Small,
} from "react-icons/tb";

const Method = ({ method }) => {
  console.log(method);
  const setIcon = (index) => {
    let icon;
    switch (index) {
      case 0:
        icon = TbNumber1Small;
        break;
      case 1:
        icon = TbNumber2Small;
        break;
      case 2:
        icon = TbNumber3Small;
        break;
      case 3:
        icon = TbNumber4Small;
        break;
      case 4:
        icon = TbNumber5Small;
        break;
      case 5:
        icon = TbNumber6Small;
        break;
      case 6:
        icon = TbNumber7Small;
        break;
      case 7:
        icon = TbNumber8Small;
        break;
      case 8:
        icon = TbNumber9Small;
        break;
      case 9:
        icon = TbNumber10Small;
        break;
    }
    return icon;
  };
  return (
    <div className="w-full">
      <h2 className="font-gistesy text-7xl m-2">Method</h2>
      <Timeline className="m-4">
        {method.map((point, index) => (
          <Timeline.Item key={index}>
            <Timeline.Point icon={setIcon(index)} />
            <Timeline.Content>
              <Timeline.Body>{point.body}</Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

Method.propTypes = {
  method: PropTypes.array.isRequired,
};

export default Method;
