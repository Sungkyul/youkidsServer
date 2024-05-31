import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BeforeButton from "../components/BeforeButton";

function Noti() {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center py-4">
        <div className="absolute left-0 w-6 h-6 ml-4">
          <BeforeButton
            text={""}
            onClick={() => {
              navigate("/Home");
            }}
          />
        </div>
        <p className=" text-[20px] text-center font-bold">알림</p>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              사진을 전송받았습니다.
            </p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="w-[62px] text-right text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
              23.05.16
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4 py-2">
            <p className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              운동회
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              사진을 전송했습니다.
            </p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="w-[62px] text-right text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
              23.05.05
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4 py-2">
            <p className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              어린이날
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              사진을 전송했습니다.
            </p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="w-[62px] text-right text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
              23.03.20
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4 py-2">
            <p className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              소풍
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              사진을 전송했습니다.
            </p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="w-[62px] text-right text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
              23.03.02
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4 py-2">
            <p className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              입학식
            </p>
          </div>
        </div>
      </div>

      <div className="justify-center py-4">
        <p className="text-xs text-center text-gray-600">
          최근 30일간 알림을 표시합니다.
        </p>
      </div>
    </div>
  );
}

export default Noti;
