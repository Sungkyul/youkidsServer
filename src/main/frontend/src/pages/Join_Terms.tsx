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
        <div className="my-6 relative flex items-center bg-white p-2 max-h-60 overflow-y-auto">
          <span>
            <br />
            1. 회원은 본인의 사진을 업로드함으로써, <br />
            회사가 이를 서비스 목적으로 사용할 수 <br />
            있음에 동의합니다. <br />
            2. 제 3자의 초상이 포함된 경우, <br />
            회원은 해당 인물의 동의를 받아야 하며, <br />
            이에 대한 책임은 회원에게 있습니다. <br />
            3. 사진은 회원의 요청 시 삭제 가능하며, <br />
            계정 삭제 시 자동으로 삭제됩니다. <br />
            4. 초상권 침해에 대한 모든 책임은 <br />
            회원에게 있습니다. <br />
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
