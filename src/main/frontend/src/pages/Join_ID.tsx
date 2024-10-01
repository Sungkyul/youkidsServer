import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal2 from "../components/Modal2";
import ExitButton from "../components/ExitButton";

function Join_ID() {
  const navigate = useNavigate();
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false); // 입력하지 않은 경우 모달 열림 여부 상태
  const [isInvalidLengthModalOpen, setIsInvalidLengthModalOpen] =
    useState(false); // 11자리가 아닌 경우 모달 열림 여부 상태
  const [phoneNumber, setPhoneNumber] = useState(""); // 입력된 휴대폰 번호 상태를 관리

 //  POST 요청으로 서버에 데이터를 전송하는 코드
const handleConfirmation = async () => {
  if (!phoneNumber.trim()) {
    setIsEmptyModalOpen(true);
  } else if (phoneNumber.trim().length !== 11) {
    setIsInvalidLengthModalOpen(true);
  } else {
    try {
      // 서버로 POST 요청 보내기
      const response = await fetch("/phoneNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(), // 서버로 전송할 휴대폰 번호
        }),
      });

      if (response.ok) {
        
        navigate("/Join_PW");
      } else {
        console.error("서버 오류 발생");
      }
    } catch (error) {
      console.error("요청 중 오류가 발생했습니다.", error);
    }
  }
};


  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div>
          <span className="text-slate-500 text-[26px] font-bold font-['Pretendard'] leading-snug">
            휴대폰 번호
          </span>
          <span className="text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            를<br />
            입력해 주세요.
          </span>
        </div>
        <div className="my-4 flex items-center justify-start w-72 h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="tel"
            className="mx-2 w-full h-full text-neutral-900 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="휴대폰 번호를 입력하세요. (-제외)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          onClick={handleConfirmation}
          className="flex items-center justify-center w-72 h-[50px] bg-slate-500 rounded-lg"
        >
          <div className="text-center text-white text-base font-normal font-['Pretendard'] leading-snug">
            확인
          </div>
        </button>
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
            휴대폰 번호를 입력해주세요.
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
      {/* 11자리가 아닌 경우 */}
      <Modal2
        isOpen={isInvalidLengthModalOpen}
        onClose={() => setIsInvalidLengthModalOpen(false)}
      >
        <div className="">
          <div className="flex">
            <div className="ml-auto">
              <ExitButton
                text="모달닫기"
                onClick={() => setIsInvalidLengthModalOpen(false)}
              />
            </div>
          </div>
          <div className="my-2 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            올바르게 입력해주세요.
          </div>
          <button
            className="my-4 w-[280px] h-9 bg-neutral-100 rounded-lg border border-stone-300"
            onClick={() => setIsInvalidLengthModalOpen(false)}
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

export default Join_ID;
