import React, { createContext, useContext, useState, useEffect } from "react";

interface AlbumEntry {
  title: string;
  images: string[];
  phoneNumber: string;
  id: number; // 앨범 ID 추가
}

interface ImageContextType {
  album: AlbumEntry[];
  saveImages: (
    images: string[],
    title: string,
    phoneNumber: string,
    id: number
  ) => void; // 앨범 ID 추가
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [album, setAlbum] = useState<AlbumEntry[]>([]); // 앨범 상태 추가

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 앨범 데이터를 불러옴
  useEffect(() => {
    const storedAlbum = localStorage.getItem("album");
    if (storedAlbum) {
      setAlbum(JSON.parse(storedAlbum)); // 로컬 스토리지에서 데이터 불러오기
    }
  }, []);

  const saveImages = (
    images: string[],
    title: string,
    phoneNumber: string,
    id: number
  ) => {
    const newAlbumEntry: AlbumEntry = { title, images, phoneNumber, id }; // 앨범 ID 포함
    const updatedAlbum = [...album, newAlbumEntry];

    setAlbum(updatedAlbum); // 앨범 상태 업데이트
    localStorage.setItem("album", JSON.stringify(updatedAlbum)); // 로컬 스토리지에 저장
  };

  return (
    <ImageContext.Provider value={{ album, saveImages }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
