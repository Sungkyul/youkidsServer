import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import NextButton from "../components/NextButton";

const Down_Face: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imagePaths } = location.state || { imagePaths: [] };

  const handleConfirm = () => {
    navigate("/Home");
  };

  const handleCancel = () => {
    // Navigate to the cancel route
    navigate("/Down_Code"); // Replace with your actual route
  };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          얼굴 선택
        </p>
      </div>
      <div
        className={`mx-[14px] my-[14px] rounded-lg flex items-center justify-center cursor-pointer bg-neutral-100 `}
      >
        <div className="items-center w-[332px] h-[121px]">
          <div className="ml-4 mt-2">
            <p>인물1</p>
            <br />
          </div>
          <div className="mx-[14px] my-[14px] flex items-center justify-between">
            <div className="flex items-center">
              {imagePaths.map((path: string, index: number) => (
                <img
                  key={index}
                  src={path}
                  alt={`Photo ${index}`}
                  className="w-11 h-11 rounded-[50px]"
                />
              ))}
            </div>
            <div className="w-6 h-6 relative">
              <NextButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-[24px]">
        <button
          className="w-36 h-9 bg-emerald-200 rounded-lg shadow"
          //onClick={handleOpenModal}
        >
          <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
            생성
          </div>
        </button>
        <button
          className="w-36 h-9 bg-emerald-200 rounded-lg shadow"
          onClick={handleCancel}
        >
          <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
            취소
          </div>
        </button>
      </div>
    </div>
  );
};

export default Down_Face;
