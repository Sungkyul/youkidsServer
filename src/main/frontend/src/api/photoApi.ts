import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7080", // Spring Boot 서버 주소
});

export const uploadPhotos = async (files: File[]): Promise<string> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.code;
};

export const getImagePaths = async (password: string): Promise<string[]> => {
  const response = await api.get("/getImages", {
    params: {
      password,
    },
  });

  return response.data;
};
