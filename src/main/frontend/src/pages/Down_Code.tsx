import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DownCode: React.FC = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/down_face?verificationCode=${code}`);
  };

  return (
    <div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="코드를 입력하세요"
      />
      <button onClick={handleSubmit}>조회</button>
    </div>
  );
};

export default DownCode;
