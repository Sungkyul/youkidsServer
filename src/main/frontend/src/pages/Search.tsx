import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Magnifier from "../assets/Magnifier.svg";
import axios from "axios";

function Search() {
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

  const handleCancel = () => {
    navigate(`/home?userId=${username}`);
  };

  return (
    <div className="w-full mx-auto">
      <div className="mt-[24px] flex items-center justify-center">
        <div className="flex w-[293px] h-[38px] bg-neutral-200 rounded-lg">
          <img
            src={Magnifier}
            alt="검색"
            className="my-2 mx-2 w-[22px] h-[22px] relative"
          />
          <input
            type="text"
            placeholder="검색"
            className="flex-grow my-2 bg-transparent text-neutral-500 text-base font-normal font-['Pretendard'] leading-snug focus:outline-none pl-2"
          />
        </div>
        <button>
          <div
            onClick={handleCancel}
            className="ml-3 text-center text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug"
          >
            취소
          </div>
        </button>
      </div>
      <div className="flex items-center justify-between mx-[14px] my-[24px]">
        <div className="text-center text-neutral-500 text-xs font-normal font-['Pretendard'] leading-snug">
          최근 검색어
        </div>
        <div className="text-center text-neutral-500 text-xs font-normal font-['Pretendard'] leading-snug">
          전체삭제
        </div>
      </div>
      <div>
        <div className="flex mx-[14px] my-[14px]">
          <div className="flex items-center justify-center w-[22px] h-[22px] bg-neutral-200 rounded-full">
            <img src={Magnifier} alt="검색" className="w-3.5 h-3.5 relative" />
          </div>
          <div className="ml-1 w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
            체육대회
          </div>
        </div>
        <div className="flex mx-[14px] my-[14px]">
          <div className="flex items-center justify-center w-[22px] h-[22px] bg-neutral-200 rounded-full">
            <img src={Magnifier} alt="검색" className="w-3.5 h-3.5 relative" />
          </div>
          <div className="ml-1 w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
            입학식
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
