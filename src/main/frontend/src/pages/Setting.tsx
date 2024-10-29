import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeforeButton from "../components/BeforeButton";
import MenuButton from "../components/Menu";
import axios from "axios";

function Setting() {
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
          앱 설정
        </p>
        <div className="m-6"></div>
        {/* <MenuButton
          text={""}
          onClick={() => {
            //navigate("/Home");
          }}
        ></MenuButton> */}
      </div>

      <div className="pt-2 border-b border-gray-300">
        <div className="flex parent justify-between py-4">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              알림 설정
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              알림 수신 설정
            </span>
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[140px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              방해 금지 시간 설정
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between py-4">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              화면 설정
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              테마 설정
            </span>
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              글꼴 설정
            </span>
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              언어 설정
            </span>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex parent justify-between py-4">
          <div className="parent pl-4">
            <p className="text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              기타
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[120px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              캐시 데이터 삭제
            </span>
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[120px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              이용 약관 및 정책
            </span>
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="flex pl-4">
            <span className="w-[100px] text-neutral-900 text-base font-normal font-['Pretendard'] leading-snug">
              버전
            </span>
          </div>
          <div className="flex pr-4">
            <span className="text-gray-700 text-[14px] font-normal font-['Pretendard'] leading-snug">
              24.10.4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
