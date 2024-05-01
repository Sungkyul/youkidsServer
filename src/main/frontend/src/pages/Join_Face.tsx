import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import light from "../assets/light.svg";
import Modal2 from "../components/Modal2";
import ExitButton from "../components/ExitButton";

function Join_Face() {
  const navigate = useNavigate();
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false); // 모달이 열려있는지 상태를 관리
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFilesArray = Array.from(files);
    setSelectedFiles(selectedFilesArray);

    // 선택된 파일들에 대한 미리보기 이미지 설정
    const previewImagesArray = selectedFilesArray.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onload = () => {
          resolve(reader.result as string);
        };
      });
    });
    Promise.all(previewImagesArray).then((images) => {
      setPreviewImages(images);
    });
  };

  const handleConfirmation = () => {
    // 얼굴 사진이 등록되었는지 확인하는 조건
    if (selectedFiles.length > 0) {
      navigate("/Join_Done");
    } else {
      setIsEmptyModalOpen(true);
    }
  };

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
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <div className="w-72 h-[305px] bg-white rounded-lg overflow-auto">
            <div className="flex flex-wrap">
              {previewImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`프로필 이미지 ${index + 1}`}
                  className="w-16 h-16 m-1"
                />
              ))}
            </div>

            {previewImages.length === 0 && (
              <div className="w-72 h-[305px] flex items-center justify-center">
                <div className="text-center text-slate-500 text-base font-normal font-['Pretendard'] leading-snug">
                  사진 선택
                </div>
              </div>
            )}
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
            얼굴 사진을 등록해주세요.
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

export default Join_Face;
