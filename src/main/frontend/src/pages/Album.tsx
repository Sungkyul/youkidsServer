import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BeforeButton from "../components/BeforeButton";

const Album: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, images } = location.state || { title: "", images: [] }; // 전달된 앨범 데이터
  const [albumImages, setAlbumImages] = useState<string[]>([]); // 상태로 이미지 관리

  useEffect(() => {
    // 컴포넌트가 마운트될 때 상태 초기화
    setAlbumImages(images);
  }, [images]);

  return (
    <div className="mx-full mx-auto">
      <div className="w-full mx-auto flex justify-between">
        <BeforeButton
          text={""}
          onClick={() => {
            navigate("/Home");
          }}
        ></BeforeButton>
        <p className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          {title}
        </p>
        <BeforeButton
          text={""}
          onClick={() => {
            navigate("/Home");
          }}
        ></BeforeButton>
      </div>
      <div className="mt-8 ml-4 flex flex-wrap">
        {albumImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`앨범 ${title}의 이미지 ${index}`}
            className="w-[100px] h-[100px] m-1"
          />
        ))}
      </div>
    </div>
  );
};

export default Album;
