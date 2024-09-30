import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagePaths: string[];
  onSave: (title: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imagePaths,
  onSave,
}) => {
  const [title, setTitle] = useState(""); // 제목 상태 추가

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 ml-4 mr-4 rounded shadow-lg">
        <div className="flex items-center justify-center pb-2">
          <button className="text-sm pr-6" onClick={onClose}>
            취소
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 제목 변경 시 상태 업데이트
            className="bg-white w-[180px] h-[30px] rounded-lg text-center flex items-center justify-center"
            placeholder="제목"
          ></input>
          <button
            className="text-sm pl-6"
            onClick={() => {
              onSave(title); // 제목과 함께 저장 함수 호출
              setTitle(""); // 저장 후 제목 초기화
            }} // 저장 버튼 클릭 시 제목과 이미지 저장
          >
            저장
          </button>
        </div>
        <div className="flex flex-wrap ml-4 overflow-y-auto max-h-96">
          {imagePaths.map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`Photo ${index}`}
              className="w-[82px] h-[82px] m-1"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
