import React, { ChangeEvent, RefObject } from "react";

interface InputFileProps {
  onImageSelected: (selectImg: any) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

export default function InputFile({
  onImageSelected,
  fileInputRef,
}: InputFileProps) {
  const handlingOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        onImageSelected(reader.result);
      };
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handlingOnChange}
      />
    </div>
  );
}
