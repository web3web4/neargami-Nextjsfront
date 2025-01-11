import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import Button from "@/components/button/Button";
import styles from "./Cropper.module.css";

interface ImageCropProps {
  image: string;
  onCropDone: (croppedArea: any) => void;
  onCropCancel: () => void;
}

export default function ImageCrop({
  image,
  onCropDone,
  onCropCancel,
}: ImageCropProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropComplete = (
    croppedAreaPercentage: Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.cropperWrapper}>
        <Cropper
          image={image}
          aspect={1 / 1}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
        <div className={styles.btnImage}>
          <Button variant="white" size="cust" onClick={onCropCancel}>
            Cancel
          </Button>
          <div>
            <Button variant="blue" size="cust" onClick={() => onCropDone(croppedArea)}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
