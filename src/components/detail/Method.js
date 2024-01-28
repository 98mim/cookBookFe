import React from "react";
import PropTypes from "prop-types";

const Method = ({ method }) => {
  return (
    <>
      <h2 className="font-gistesy text-7xl m-2">Method</h2>
      <div className="">{method}</div>
    </>
  );
};

Method.propTypes = {
  method: PropTypes.string.isRequired,
};

export default Method;
