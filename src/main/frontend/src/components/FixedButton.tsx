import React from "react";
import 홈하단버튼 from "../assets/홈하단버튼.svg"; // isOpen일 때 보여줄 이미지
import 홈하단닫기 from "../assets/홈하단닫기.svg"; // isOpen이 아닐 때 보여줄 이미지
import PShareButton from "./PShareButton.tsx";
import PDownButton from "./PDownButton.tsx";
import { useNavigate } from "react-router-dom";

interface FixedButtonProps {
  isOpen: boolean;
  onClose: () => void;
  style?: React.CSSProperties;
}

const FixedButton: React.FC<FixedButtonProps> = ({
  isOpen,
  onClose,
  style,
}) => {
  const navigate = useNavigate();

  const handlePhotoShareClick = () => {
    // 파일 업로드 다이얼로그 열기
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;

    input.onchange = (event) => {
      const target = event.target as HTMLInputElement; // HTMLInputElement로 캐스팅
      if (target && target.files) {
        // target이 null이 아닐 때만 접근
        const files = target.files;
        navigate("/Amazon", { state: { selectedFiles: Array.from(files) } });
      }
    };

    input.click();
  };

  // isOpen 상태에 따라 다른 이미지를 선택
  const buttonImage = isOpen ? 홈하단버튼 : 홈하단닫기;

  return (
    <>
      <div className="fixed bottom-0 right-0 pr-2">
        <button onClick={onClose}>
          <img src={buttonImage} alt="홈하단버튼" />
        </button>
      </div>
      {!isOpen && (
        <div className="fixed pb-20 bottom-0 right-0 pr-2 flex flex-col items-end space-y-1">
          <PShareButton text="사진 공유" onClick={handlePhotoShareClick} />
          <PDownButton text="앨범 생성" onClick={onClose} />
        </div>
      )}
    </>
  );
};

export default FixedButton;
