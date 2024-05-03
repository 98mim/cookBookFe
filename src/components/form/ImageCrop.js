import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import PropTypes from "prop-types";
import CustomFileInput from "./CustomFileInput";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line no-unused-vars
const ImageCrop = ({ defaultValue = null, name, onSelect }) => {
  const [image, setImage] = useState(defaultValue);
  const [croppedImage, setCroppedImage] = useState(defaultValue);
  const [acceptCroppedImage, setAcceptCroppedImage] = useState(!!defaultValue);
  const cropperRef = useRef(null);
  const { t } = useTranslation();

  const handleFileSelect = (fileName, file) => {
    setImage(file);
    onSelect(name, file);
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  useEffect(() => {
    onSelect("thumbnail_link", defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex-col">
      {!image && (
        <CustomFileInput onSelect={handleFileSelect} accept={"image"} />
      )}
      <div className="overflow-hidden">
        {image && !acceptCroppedImage && (
          <Cropper
            src={image}
            guides={false}
            ref={cropperRef}
            crop={onCrop}
            className=" max-w-full h-64 border-2 border-gray-300 border-dashed p-1  mb-6 bg-purple-200"
          />
        )}
      </div>
      {croppedImage && (
        <div className={"mb-6"}>
          <img
            src={croppedImage}
            alt="Cropped"
            className="w-full h-64 border-2 border-gray-300 border-dashed object-contain p-1 bg-indigo-100"
          />
        </div>
      )}
      {croppedImage && (
        <div className={"w-full flex flex-row justify-end"}>
          {!acceptCroppedImage && (
            <CustomButton
              onClick={() => {
                setAcceptCroppedImage(!acceptCroppedImage);
                onSelect(name, croppedImage.split(",")[1]);
              }}
              text={t("Button.acceptThumbnail")}
            />
          )}
          {acceptCroppedImage && (
            <CustomButton
              onClick={() => {
                setAcceptCroppedImage(!acceptCroppedImage);
                setImage(null);
                setCroppedImage(null);
                onSelect(name, null);
                onSelect("thumbnail_link", null);
              }}
              text={t("Button.denyThumbnail")}
            />
          )}
        </div>
      )}
    </div>
  );
};

ImageCrop.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageCrop;
