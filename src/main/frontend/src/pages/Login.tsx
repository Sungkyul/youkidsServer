import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // '회원가입' 버튼을 클릭하면 Home로 이동
    navigate("/Home");
  };

  const handleJoin = () => {
    // '회원가입' 버튼을 클릭하면 Join_ID로 이동
    navigate("/Join_ID");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div className="justify-center py-2">
          <p className=" text-[20px] text-center font-bold">로그인</p>
        </div>
        <div className="my-4 flex items-center justify-start w-72 h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="tel"
            className="mx-2 w-full h-full text-neutral-900 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="아이디"
          />
        </div>
        <div className="my-4 flex items-center justify-start w-72 h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="password"
            className="mx-2 w-full h-full text-neutral-900 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="비밀번호"
          />
        </div>
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
