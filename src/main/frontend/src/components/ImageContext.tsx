import React, { createContext, useContext, useState } from "react";

interface AlbumEntry {
  title: string;
  images: string[];
}

interface ImageContextType {
  album: AlbumEntry[];
  saveImages: (images: string[], title: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [album, setAlbum] = useState<AlbumEntry[]>([]); // 앨범 상태 추가

  const saveImages = (images: string[], title: string) => {
    setAlbum((prev) => [...prev, { title, images }]); // 제목과 이미지를 앨범에 저장
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
