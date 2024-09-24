import React, { useState } from "react";
import GroupView from "./Down_Face";

const CodeInput: React.FC = () => {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
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
      {submitted && <GroupView verificationCode={code} />}
    </div>
  );
};

export default CodeInput;
