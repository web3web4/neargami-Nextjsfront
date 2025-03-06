"use client";
import React, { useRef, useCallback, useState } from "react";
import ReactQuill from "react-quill-new";
import Loading from "../loading/Loading";
import "react-quill-new/dist/quill.snow.css";
import "./RichBoxQuillStyle.css";
import { uploadFile } from "@/apiService";

interface RichBoxQuillProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function RichBoxQuill({
  placeholder,
  value,
  onChange,
}: RichBoxQuillProps) {
  const quillRef = useRef<ReactQuill>(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];

        setIsLoading(true);

        try {
          const url = await uploadFile(file);
          const quillObj = quillRef.current!.getEditor();
          let range = quillObj.getSelection();

          if (!range || range.index === null) {
            const length = quillObj.getLength();
            range = { index: length, length: 0 };
            quillObj.setSelection(range);
          }

          quillObj.insertEmbed(range.index, "image", url);
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["code-block"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div>
      {isLoading && <Loading />}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
