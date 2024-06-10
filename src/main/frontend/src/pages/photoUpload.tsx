import React, { useState, useRef, ChangeEvent } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Amazon = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("http://localhost:7080/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const verificationCode = response.data.code;
      alert("업로드 성공! 검증 코드: " + verificationCode);
      navigate("/verification", { state: { code: verificationCode } });
    } catch (error) {
      alert("업로드 실패!");
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Amazon;
