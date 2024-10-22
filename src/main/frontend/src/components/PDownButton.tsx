import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Down from "../assets/Down.svg";
import axios from "axios";

interface PDownButtonProps {
  text: string;
  onClick: () => void;
}

const PDownButton: React.FC<PDownButtonProps> = ({ text, onClick }) => {
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
    navigate(`/down_code?userId=${username}`);
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
