import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal2 from "../components/Modal2";
import ExitButton from "../components/ExitButton";

function Join_Profile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달이 열려있는지 상태를 관리
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleConfirmation = () => {
    // 프로필 사진이 등록되었는지 확인하는 조건
    if (selectedFile) {
      navigate("/Join_Face");
    } else {
      setIsModalOpen(true);
    }
  };

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
            onChange={handleFileChange}
          />
          <div className="w-40 h-40 bg-white rounded-[50px] flex items-center justify-center">
            <div className="text-center text-slate-500 text-base font-normal font-['Pretendard'] leading-snug">
              사진 선택
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmation}
          className="flex items-center justify-center w-72 h-[50px] bg-slate-500 rounded-lg"
        >
          <div className="text-center text-white text-base font-normal font-['Pretendard'] leading-snug">
            등록
          </div>
        </button>
      </div>

      {/* 모달 */}
      <Modal2 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* 모달 내용 */}
        <div className="">
          <div className="flex">
            <div className="ml-auto">
              <ExitButton
                text="앨범생성"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
          <div className="my-2 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            프로필을 등록해주세요.
          </div>
          <button className="my-4 w-[280px] h-9 bg-neutral-100 rounded-lg border border-stone-300">
            <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              확인
            </div>
          </button>
        </div>
      </Modal2>
    </div>
  );
}

export default Join_Profile;
