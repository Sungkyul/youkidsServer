import React from "react";
import { useNavigate } from "react-router-dom";

function Join_Done() {
  const navigate = useNavigate();

  const handleConfirmation = () => {
    // '확인' 버튼을 클릭하면 Login로 이동
    navigate("/Login");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div className="my-16 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          가입이 완료되었습니다.
        </div>

        <button
          onClick={handleConfirmation}
          className="flex items-center justify-center w-72 h-[50px] bg-slate-500 rounded-lg"
        >
          <div className="text-center text-white text-base font-normal font-['Pretendard'] leading-snug">
            확인
          </div>
        </button>
      </div>
    </div>
  );
}

export default Join_Done;
