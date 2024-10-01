import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:7080/login", {
        phoneNumber: phoneNumber,  
        password: password,
      },{ withCredentials: true } // 세션 쿠키를 유지
       );
      console.log("로그인 성공:", response.data);
      navigate("/Home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // AxiosError일 경우 처리
        console.error("로그인 실패:", err.response?.data || err.message);
      } else {
        // AxiosError가 아닐 경우 처리
        console.error("로그인 실패:", err);
      }
      setError("잘못된 사용자 이름 또는 비밀번호입니다.");
      setPassword("");
    }
  };
  

  const handleJoin = () => {
    navigate("/Join_ID");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div className="justify-center py-2">
          <p className="text-[20px] text-center font-bold">로그인</p>
        </div>
        <div className="my-4 flex items-center justify-start w-72 h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mx-2 w-full h-full text-neutral-900 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="아이디"
          />
        </div>
        <div className="my-4 flex items-center justify-start w-72 h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mx-2 w-full h-full text-neutral-900 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="비밀번호"
          />
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-72 h-[50px] bg-slate-500 rounded-lg"
        >
          <div className="text-center text-white text-base font-normal font-['Pretendard'] leading-snug">
            로그인
          </div>
        </button>
        <div className="flex items-center justify-center">
          <button
            onClick={handleJoin}
            className="my-4 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
          >
            회원가입
          </button>
          <span className="mx-2 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug">
            |
          </span>
          <button className="my-4 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug">
            아이디/비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
