import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Share_Done() {
  const navigate = useNavigate();
  const location = useLocation();
  const verificationCode = location.state?.verificationCode || "N/A"; // 전달받은 코드

  const handleConfirm = () => {
    navigate("/Home");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="">
        <span className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          코드가 생성되었습니다.
        </span>
        <br />
        <span className="ml-5 w-[150px] text-center text-neutral-900 text-4xl font-semibold font-['Pretendard'] leading-snug">
          <p>{verificationCode}</p>
        </span>
        <div className="mt-8">
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center w-[200px] h-[50px] bg-emerald-200 rounded-lg"
          >
            <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              확인
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Share_Done;
