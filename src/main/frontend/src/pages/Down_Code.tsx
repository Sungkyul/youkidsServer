import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal2 from "../components/Modal2";
import ExitButton from "../components/ExitButton";
import { getImagePaths } from "../api/photoApi"; // 이미지 경로를 불러오는 함수 임포트

function Down_Code() {
  const navigate = useNavigate();
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false);
  const [code, setCode] = useState("");

  const handleConfirmation = async () => {
    if (!code.trim()) {
      setIsEmptyModalOpen(true);
    } else {
      try {
        const paths = await getImagePaths(code); // API 호출
        // 이미지 경로를 상태로 전달하며 Down_Face 페이지로 이동
        navigate("/Down_Face", { state: { imagePaths: paths } });
      } catch (error) {
        console.error("Error fetching image paths:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/Home");
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
