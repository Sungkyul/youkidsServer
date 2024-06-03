import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal2 from "../components/Modal2";
import ExitButton from "../components/ExitButton";

function Down_Code() {
  const navigate = useNavigate();
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false); // 입력하지 않은 경우 모달 열림 여부 상태
  const [code, setCode] = useState(""); // 입력된 코드 상태를 관리
  const handleConfirmation = () => {
    if (!code.trim()) {
      setIsEmptyModalOpen(true);
    } else {
      //코드 입력되었을 때 Down_Face으로 이동
      navigate("/Down_Face");
    }
  };
  const handleCancel = () => {
    // Navigate to the cancel route
    navigate("/Home"); // Replace with your actual route
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="mb-6">
        <div className="pb-4">
          <div className="mb-1 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            코드를 입력해 주세요.
          </div>
          <div className="w-[288px] text-center text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
            (숫자만 가능)
          </div>
        </div>

        <div className="my-6 w-72 flex items-center justify-center h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="number"
            className="w-40 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="입력해 주세요."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleConfirmation}
            className="mx-2 w-[126px] h-9 bg-emerald-200 rounded-lg shadow"
          >
            <div className="py-2 text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              보기
            </div>
          </button>
          <button
            className="mx-2 w-[126px] h-9 bg-emerald-200 rounded-lg shadow"
            onClick={handleCancel}
          >
            <div className="py-2 text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              취소
            </div>
          </button>
        </div>
      </div>
      {/* 모달 */}
      {/* 입력하지 않은 경우 */}
      <Modal2
        isOpen={isEmptyModalOpen}
        onClose={() => setIsEmptyModalOpen(false)}
      >
        <div className="">
          <div className="flex">
            <div className="ml-auto">
              <ExitButton
                text="모달닫기"
                onClick={() => setIsEmptyModalOpen(false)}
              />
            </div>
          </div>
          <div className="my-2 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            코드를 입력해주세요.
          </div>
          <button
            className="my-4 w-[280px] h-9 bg-neutral-100 rounded-lg border border-stone-300"
            onClick={() => setIsEmptyModalOpen(false)}
          >
            <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              확인
            </div>
          </button>
        </div>
      </Modal2>
    </div>
  );
}

export default Down_Code;
