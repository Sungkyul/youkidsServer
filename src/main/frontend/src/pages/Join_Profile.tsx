import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal2 from "../components/Modal2";
import ExitButton from "../components/ExitButton";

function Join_Profile() {
  const navigate = useNavigate();
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false); // 모달 상태 관리
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택된 파일
  const [previewImage, setPreviewImage] = useState<string | null>(null); // 미리보기 이미지

  // 파일 선택 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    // 미리보기 이미지 설정
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // 프로필 사진을 서버로 전송
  const uploadProfilePicture = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profile", selectedFile);

    try {
      const response = await fetch("http://localhost:7080/profilePicture", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // 업로드 성공 시 회원가입 완료 페이지로 이동
        navigate("/Join_Terms");
      } else {
        console.error("프로필 사진 업로드 실패:", response.statusText);
        setIsEmptyModalOpen(true); // 실패 시 모달 열기
      }
    } catch (error) {
      console.error("프로필 사진 업로드 중 오류 발생:", error);
      setIsEmptyModalOpen(true);
    }
  };

  // 프로필 사진 등록 확인
  const handleConfirmation = () => {
    if (selectedFile) {
      uploadProfilePicture(); // 프로필 사진 업로드 함수 호출
    } else {
      setIsEmptyModalOpen(true); // 파일 선택이 안 되어 있으면 모달 열기
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

          {previewImage && (
            <img
              src={previewImage}
              alt="프로필 이미지"
              className="w-40 h-40 rounded-[50px]"
            />
          )}
          {!previewImage && (
            <div className="w-40 h-40 bg-white rounded-[50px] flex items-center justify-center">
              <div className="text-center text-slate-500 text-base font-normal font-['Pretendard'] leading-snug">
                사진 선택
              </div>
            </div>
          )}
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
      <Modal2
        isOpen={isEmptyModalOpen}
        onClose={() => setIsEmptyModalOpen(false)}
      >
        {/* 모달 내용 */}
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
            프로필 사진을 등록해주세요.
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

export default Join_Profile;
