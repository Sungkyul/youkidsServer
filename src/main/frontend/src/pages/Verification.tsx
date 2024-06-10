import React from "react";
import { useLocation } from "react-router-dom";

const Verification = () => {
  const location = useLocation();
  const { code } = location.state;

  return (
    <div>
      <h2>업로드 성공!</h2>
      <p>검증 코드: {code}</p>
    </div>
  );
};

export default Verification;
