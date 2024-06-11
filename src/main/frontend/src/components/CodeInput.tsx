import React, { useState } from "react";
import { getImagePaths } from "../api/photoApi";

const CodeInput: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleViewPhotos = async () => {
    const paths = await getImagePaths(code);
    setImagePaths(paths);
  };

  return (
    <div>
      <input
        type="text"
        value={code}
        onChange={handleInputChange}
        placeholder="Enter code"
      />
      <button onClick={handleViewPhotos}>View Photos</button>
      <div>
        {imagePaths.map((path, index) => (
          <img key={index} src={path} alt={`Photo ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CodeInput;
