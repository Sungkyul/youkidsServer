import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagePaths: string[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imagePaths }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex items-center justify-center pb-2">
          <button className="text-sm pr-6" onClick={onClose}>
            취소
          </button>
          <input
            className="bg-white w-[180px] h-[30px] rounded-lg text-center flex items-center justify-center"
            placeholder="제목"
          ></input>
          <button className="text-sm pl-6" onClick={onClose}>
            저장
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          {imagePaths.map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`Photo ${index}`}
              className="w-[90px] h-[90px] m-1"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
