import React from "react";
import { useNavigate } from "react-router-dom";
import Down from "../assets/Down.svg";

interface PDownButtonProps {
  text: string;
  onClick: () => void;
}

const PDownButton: React.FC<PDownButtonProps> = ({ text, onClick }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Down_Code");
    onClick();
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleButtonClick}
        className="font-bold py-2 px-4 rounded-xl inline-flex items-center bg-[#DAEBE5]"
      >
        <img src={Down} alt="Down Icon" className="pr-2" />
        <p className="text-sm">앨범 생성</p>
      </button>
    </div>
  );
};

export default PDownButton;
