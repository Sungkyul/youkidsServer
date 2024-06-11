import React, { useState } from "react";
import { uploadPhotos } from "../api/photoApi";

const PhotoUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [code, setCode] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const code = await uploadPhotos(selectedFiles);
      setCode(code);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {code && <div>Verification Code: {code}</div>}
    </div>
  );
};

export default PhotoUpload;
