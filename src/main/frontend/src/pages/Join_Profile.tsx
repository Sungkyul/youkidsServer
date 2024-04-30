import React from "react";

function Join_Profile() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div>
          <span className="text-slate-500 text-[26px] font-bold font-['Pretendard'] leading-snug">
            프로필 사진
          </span>
          <span className="text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            을<br />
            등록해 주세요.
          </span>
        </div>

        <div className="my-6 relative flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-40 h-40 bg-white rounded-[50px] flex items-center justify-center">
            <div className="text-center text-slate-500 text-base font-normal font-['Pretendard'] leading-snug">
              사진 선택
            </div>
          </div>
        </div>

        <button className="flex items-center justify-center w-72 h-[50px] bg-slate-500 rounded-lg">
          <div className="text-center text-white text-base font-normal font-['Pretendard'] leading-snug">
            등록
          </div>
        </button>
      </div>
    </div>
  );
}

export default Join_Profile;
