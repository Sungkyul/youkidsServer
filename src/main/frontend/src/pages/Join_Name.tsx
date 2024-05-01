import React from "react";
import { useNavigate } from "react-router-dom";

function Join_Name() {
  const navigate = useNavigate();

  const handleConfirmation = () => {
    // '확인' 버튼을 클릭하면 Join_Profile로 이동
    navigate("/Join_Profile");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div>
          <span className="text-slate-500 text-[26px] font-bold font-['Pretendard'] leading-snug">
            이름
          </span>
          <span className="text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            을<br />
            입력해 주세요.
          </span>
        </div>
        <div className="my-4 flex items-center justify-start w-72 h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="text"
            className="mx-2 w-full h-full text-neutral-900 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="이름을 입력하세요."
          />
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

export default Join_Name;
