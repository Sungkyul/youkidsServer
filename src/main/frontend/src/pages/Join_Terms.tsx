import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Terms: React.FC = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const handleAgree = async () => {
    if (isAgreed) {
      try {
        await fetch("http://localhost:7080/complete", {
          method: "POST",
        });
        navigate("/login");
      } catch (error) {
        console.error("Error completing signup:", error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div>
          <span className="text-slate-500 text-[26px] font-bold font-['Pretendard'] leading-snug">
            약관
          </span>
          <span className="text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            에<br />
            동의해주세요.
          </span>
        </div>
        <div className="my-6 relative flex items-center bg-white">
          <span>
            aaaa
            <br />
            bbbb
            <br />
            cccc
          </span>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleAgreeChange}
            />
            &nbsp;동의합니다
          </label>
        </div>

        <button
          onClick={handleAgree}
          disabled={!isAgreed} // 비활성화 여부
          className={`flex items-center justify-center w-72 h-[50px] rounded-lg ${
            isAgreed
              ? "bg-slate-500" // 활성화된 상태: 파란색 버튼
              : "bg-stone-300 cursor-not-allowed" // 비활성화된 상태: 회색 버튼
          }`}
        >
          <div className="text-center text-white text-base font-normal font-['Pretendard'] leading-snug">
            가입 완료
          </div>
        </button>
      </div>
    </div>
  );
};

export default Terms;
