import React from "react";
import { useNavigate } from "react-router-dom";
import Share from "../assets/Share.svg";

interface PShareButtonProps {
  text: string;
  onClick: () => void;
}

const PShareButton: React.FC<PShareButtonProps> = ({ text, onClick }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Amazon");
    onClick();
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleButtonClick}
        className="font-bold py-2 px-4 rounded-xl inline-flex items-center bg-[#DAEBE5]"
      >
        <img src={Share} alt="Share Icon" className="pr-2" />
        <p className="text-sm">사진 공유</p>
      </button>
    </div>
  );
};

export default PShareButton;
