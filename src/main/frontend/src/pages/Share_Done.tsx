import React from "react";
import { useNavigate } from "react-router-dom";

function Share_Done() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // '회원가입' 버튼을 클릭하면 Home로 이동
    navigate("/Home");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="">
        <span className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          코드가 생성되었습니다.
        </span>
        <br />
        <br />
        <span className="ml-5 w-[150px] text-center text-neutral-900 text-4xl font-semibold font-['Pretendard'] leading-snug">
          #123456
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
