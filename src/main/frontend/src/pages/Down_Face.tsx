import React from "react";
import { useLocation } from "react-router-dom";
import GroupView from "./GroupView"; // 기존 GroupView를 가져옵니다.

const DownFace: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const verificationCode = params.get("verificationCode") || "";

  return <GroupView verificationCode={verificationCode} />;
};

export default DownFace;
