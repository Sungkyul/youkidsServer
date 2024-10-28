import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeforeButton from "../components/BeforeButton";
import MenuButton from "../components/Menu";
import axios from "axios";

interface Notice {
  title: string;
  date: string;
  content: string;
}

const notices: Notice[] = [
  {
    title: "즐겨찾기 기능 안내",
    date: "2024-08-28",
    content: "마음에 드는 앨범을 즐겨찾기에 등록할 수 있어요.",
  },
  {
    title: "프로필 관리 기능 안내",
    date: "2024-06-20",
    content:
      "사용자별 프로필 사진과 이름을 설정하여 개인화된 서비스를 이용하세요.",
  },
  {
    title: "앨범 기능 안내",
    date: "2024-02-12",
    content: "다운받은 사진으로 앨범을 만드세요.",
  },
  {
    title: "서비스 개시!",
    date: "2023-12-15",
    content: "AI를 활용한 얼굴 분류 서비스 개시",
  },
];

function NoticePage() {
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
          공지
        </p>
        <div className="m-6"></div>
        {/* <MenuButton
          text={""}
          onClick={() => {
            //navigate("/Home");
          }}
        ></MenuButton> */}
      </div>

      <main className="p-6 space-y-4">
        {notices.map((notice, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{notice.title}</h2>
            <p className="text-sm text-gray-500">{notice.date}</p>
            <p className="mt-2 text-gray-700">{notice.content}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default NoticePage;
