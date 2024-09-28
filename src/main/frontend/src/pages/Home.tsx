import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpeg";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import MenuBar from "../components/MenuBar";
import SearchButton from "../components/SearchButton";
import Notification from "../components/Notification";
import FixedButton from "../components/FixedButton";
import { useImageContext } from "../components/ImageContext"; // Context import 추가

function Home() {
  const navigate = useNavigate();
  const { album } = useImageContext(); // Context에서 album 가져오기
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-2">
      <div className="w-full mx-auto flex justify-between">
        <MenuBar text="" /> {/* MenuBar 컴포넌트를 사용 */}
        <div className="flex justify-end items-center pr-4">
          <SearchButton
            text={""}
            onClick={() => {
              navigate("/Search");
            }}
          />
          <Notification
            text={""}
            onClick={() => {
              navigate("/Noti");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <img src={profile} alt="프로필" className="w-[80px] h-[80px]" />
        <p className="text-[100px] text-center text-lg  ">김연아</p>
      </div>

      {/* 저장된 앨범 표시 */}
      <div className="flex justify-center item-center space-x-6">
        <div className="flex flex-wrap justify-center">
          {album.map((entry, index) => (
            <div
              key={index}
              className="w-[125px] h-[125px] rounded-lg mx-2 mb-10"
            >
              <img
                src={entry.images[0]} // 첫 번째 이미지만 표시
                alt={`앨범 ${entry.title}`}
                className="w-[125px] h-[125px] rounded-lg"
              />
              <p className="text-xs text-left pt-1">{entry.title}</p>
            </div>
          ))}
        </div>
      </div>
      <FixedButton
        isOpen={isOpen}
        onClose={toggleOpen}
        style={{ zIndex: 9999 }}
      />
      {/* FixedButton 컴포넌트를 홈 화면의 가장 아래에 렌더링 */}
    </div>
  );
}

export default Home;
