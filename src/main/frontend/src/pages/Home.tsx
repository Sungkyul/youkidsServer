import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpeg";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import MenuBar from "../components/MenuBar";
import SearchButton from "../components/SearchButton";
import Notification from "../components/Notification";
import FixedButton from "../components/FixedButton";

function Home() {
  const navigate = useNavigate();
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
      <div className="flex justify-center item-center space-x-6">
        <div className="pb-6">
          <img
            src={image1}
            alt="짱구"
            className="w-[125px] h-[125px] rounded-lg"
          />
          <p className="text-xs text-left pt-1">입학식</p>
        </div>
        <div>
          <img
            src={image2}
            alt="짱구"
            className="w-[125px] h-[125px] rounded-lg"
          />
          <p className="text-xs text-left pt-1">체육대회</p>
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
