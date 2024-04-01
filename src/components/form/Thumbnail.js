import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageCrop from "./ImageCrop";
import CustomTextInput from "./CustomTextInput";

const Thumbnail = ({ name, defaultValue, urlName, onSelect }) => {
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (defaultValue) {
      setImage(true);
      onSelect(urlName, defaultValue);
    }
  }, [defaultValue]);

  const handleImage = (name, value) => {
    setImage(value);
    setUrl(null);
    onSelect(name, value);
  };

  const handleUrl = (name, value) => {
    setUrl(value);
    setImage(null);
    onSelect(name, value);
  };

  return (
    <div className={"pt-4"}>
      {!url && (
        <ImageCrop
          defaultValue={defaultValue}
          name={name}
          onSelect={(name, value) => handleImage(name, value)}
        />
      )}

      {url && (
        <CustomTextInput
          onChange={(name, value) => handleUrl(name, value)}
          name={urlName}
          label={"Thumbnail Url"}
          placeholder={"Thumbnail Url"}
        />
      )}
    </div>
  );
};

Thumbnail.propTypes = {
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  urlName: PropTypes.string.isRequired,
};

export default Thumbnail;
