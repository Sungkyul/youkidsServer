import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Share from "../assets/Share.svg";
import axios from "axios";

interface PShareButtonProps {
  text: string;
  onClick: () => void;
}

const PShareButton: React.FC<PShareButtonProps> = ({ text, onClick }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7080/dashboard", {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleButtonClick = () => {
    navigate(`/amazon?userId=${username}`);
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
