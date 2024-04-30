import React from "react";
import profile from "../assets/profile.svg";
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import MenuBar from "../components/MenuBar";
import SearchButton from "../components/SearchButton";
import Notification from "../components/Notification";

function Home() {
  return (
    <div className="pt-2">
      <div className="w-full mx-auto flex justify-between">
        <MenuBar text="" /> {/* MenuBar 컴포넌트를 사용 */}
        <div className="flex justify-end items-center pr-4 ">
          <SearchButton
            text={""}
            onClick={() => {
              throw new Error("Function not implemented.");
            }}
          />
          <Notification
            text={""}
            onClick={() => {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <img src={profile} alt="프로필" className="w-[80px] h-[80px]" />
        <p className="text-[100px] text-center text-lg  ">신짱구</p>
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
          <p className="text-xs text-left pt-1">입학식</p>
        </div>
      </div>
      <div className="flex justify-center item-center space-x-6">
        <div className="pb-6 ">
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
          <p className="text-xs text-left pt-1">입학식</p>
        </div>
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
          <p className="text-xs text-left pt-1">입학식</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
