import React from "react";
import { useImageContext } from "../components/ImageContext";

const Album: React.FC = () => {
  const { album } = useImageContext();

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl">앨범</h2>
      <div>
        {album.map((entry, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{entry.title}</h3>
            <div className="grid grid-cols-3 gap-4">
              {entry.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`앨범 ${entry.title}의 이미지 ${imgIndex}`}
                  className="w-full h-auto rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
