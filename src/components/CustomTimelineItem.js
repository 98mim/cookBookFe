import PropTypes from "prop-types";
import { Timeline } from "flowbite-react";
const CustomTimelineItem = ({ body, index }) => {
  return (
    <Timeline.Item
      className={
        "ml-11 border border-gray-200 rounded shadow p-2 cursor-pointer bg-indigo-100"
      }
    >
      <div
        className={
          "absolute -left-5 flex h-12 w-12 items-center justify-center rounded-full bg-purple-200 right-1  dark:bg-cyan-900 dark:ring-gray-900"
        }
      >
        {index}
      </div>
      <Timeline.Content>
        <Timeline.Body>{body}</Timeline.Body>
      </Timeline.Content>
    </Timeline.Item>
  );
};

CustomTimelineItem.propTypes = {
  body: PropTypes.node,
  index: PropTypes.string,
};
export default CustomTimelineItem;
