import React, { useState } from "react";
import light from "../assets/light.svg";

function Join_Face() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div>
          <span className="text-slate-500 text-[26px] font-bold font-['Pretendard'] leading-snug">
            본인의 얼굴
          </span>
          <span className="text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            이<br />
            나온 사진을 등록해 주세요.
          </span>
        </div>

        <div className="my-2 py-2 w-72 h-16 bg-amber-100 rounded-lg">
          <div className="mx-2 py-1 text-left text-neutral-900 text-[10px] font-normal font-['Pretendard'] leading-snug flex items-center">
            <img src={light} alt="전구" className="w-[16px] h-[16px] mr-1" />
            <span>최소 10장 이상 등록해주세요.</span>
          </div>
          <div className="mx-2 py-1 text-left text-neutral-900 text-[10px] font-normal font-['Pretendard'] leading-snug flex items-center">
            <img src={light} alt="전구" className="w-[16px] h-[16px] mr-1" />
            <span>
              다양한 표정의 사진을 등록할수록 얼굴 분류에 도움이 됩니다.
            </span>
          </div>
        </div>

        <div className="my-4 relative flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-72 h-[305px] bg-white rounded-lg flex items-center justify-center">
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

export default Join_Face;
