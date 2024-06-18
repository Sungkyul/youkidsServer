import React from "react";
import PhotoUpload from "./PhotoUpload";
import CodeInput from "./CodeInput";

const PhotoView: React.FC = () => {
  return (
    <div>
      <h1>Photo Upload and View</h1>
      <PhotoUpload />
      <CodeInput />
    </div>
  );
};

export default PhotoView;
