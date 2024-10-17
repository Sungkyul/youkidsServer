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
    <div className="container">
      <h1>약관에 동의해주세요</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleAgreeChange}
          />
          약관에 동의합니다
        </label>
      </div>
      <button
        onClick={handleAgree}
        disabled={!isAgreed} // 체크박스가 체크되지 않으면 버튼 비활성화
      >
        동의하고 가입 완료
      </button>
    </div>
  );
};

export default Terms;
