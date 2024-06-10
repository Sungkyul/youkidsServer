import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Down_Face: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imagePaths } = location.state || { imagePaths: [] };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="mb-6 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
        불러온 사진들
      </div>
      <div className="grid grid-cols-3 gap-4">
        {imagePaths.map((path: string, index: number) => (
          <img
            key={index}
            src={path}
            alt={`Photo ${index}`}
            className="w-32 h-32 object-cover"
          />
        ))}
      </div>
      <button
        onClick={() => navigate("/home")}
        className="mt-4 w-[126px] h-9 bg-emerald-200 rounded-lg shadow"
      >
        <div className="py-2 text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
          홈으로
        </div>
      </button>
    </div>
  );
};

export default Down_Face;
