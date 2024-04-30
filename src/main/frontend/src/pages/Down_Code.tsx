import React from "react";

function Down_Code() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="mb-6">
        <div className="pb-4">
          <div className="mb-1 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            코드를 입력해 주세요.
          </div>
          <div className="w-[288px] text-center text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
            (영어, 숫자만 가능)
          </div>
        </div>

        <div className="my-6 w-72 flex items-center justify-center h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="number"
            className="w-40 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="입력해 주세요."
          />
        </div>

        <div className="flex items-center justify-center">
          <button className="mx-2 w-[126px] h-9 bg-emerald-200 rounded-lg shadow">
            <div className="py-2 text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              보기
            </div>
          </button>
          <button className="mx-2 w-[126px] h-9 bg-emerald-200 rounded-lg shadow">
            <div className="py-2 text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              취소
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Down_Code;
