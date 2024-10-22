import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeforeButton from "../components/BeforeButton";
import MenuButton from "../components/Menu";
import axios from "axios";

function Noti() {
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

  return (
    <div className="w-full mx-auto">
      <div className="w-full mx-auto flex justify-between">
        <BeforeButton
          text={""}
          onClick={() => {
            navigate(`/home?userId=${username}`);
          }}
        ></BeforeButton>
        <p className="py-4 text-center text-neutral-900 text-[20px] font-semibold font-['Pretendard'] leading-snug">
          알림
        </p>
        <MenuButton
          text={""}
          onClick={() => {
            //navigate("/Home");
          }}
        ></MenuButton>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              앨범을 생성했습니다.
            </p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="w-[62px] text-right text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
              23.06.10
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4 py-2">
            <p className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              체육대회
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              앨범을 생성했습니다.
            </p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="w-[62px] text-right text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
              23.06.10
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4 py-2">
            <p className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              입학식
            </p>
          </div>
        </div>
      </div>

      <div className="justify-center py-4">
        <p className="text-xs text-center text-gray-600">
          최근 30일간 알림을 표시합니다.
        </p>
      </div>
    </div>
  );
}

export default Noti;
