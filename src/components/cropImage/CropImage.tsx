"use client";
import React, { useState, RefObject } from "react";
import InputFile from "./inputFile/InputFile";
import ImageCrop from "./cropper/Cropper";

interface CropImageProps {
  fileInputRef: RefObject<HTMLInputElement>;
  onCropComplete: (croppedImageData: string) => void;
}

export default function CropImage({
  fileInputRef,
  onCropComplete,
}: CropImageProps) {
  const [image, setImage] = useState<string>("");
  const [currPage, setCurrPage] = useState<string>("");

  const onCropDone = (imgCroppedAres: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    const canvElement = document.createElement("canvas");
    canvElement.width = imgCroppedAres.width;
    canvElement.height = imgCroppedAres.height;
    const context = canvElement.getContext("2d");

    if (!context) return;
    const img = new Image();
    img.src = image;
    img.onload = function () {
      context.drawImage(
        img,
        imgCroppedAres.x,
        imgCroppedAres.y,
        imgCroppedAres.width,
        imgCroppedAres.height,
        0,
        0,
        imgCroppedAres.width,
        imgCroppedAres.height
      );
      const dataUrl = canvElement.toDataURL("image/jpeg");
      onCropComplete(dataUrl);
      setCurrPage("");
    };
  };
  const onCropCancel = () => {
    setCurrPage("");
    setImage("");
  };

  const onImageSelected = (selectImg: string) => {
    setImage(selectImg);
    setCurrPage("crop-img");
  };

  return (
    <div>
      <InputFile
        onImageSelected={onImageSelected}
        fileInputRef={fileInputRef}
      />
      {currPage === "crop-img" ? (
        <div className="cropper">
          <ImageCrop
            image={image}
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
