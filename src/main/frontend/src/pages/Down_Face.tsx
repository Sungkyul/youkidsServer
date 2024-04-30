import React from "react";
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import image3 from "../assets/image3.svg";
import image4 from "../assets/image4.svg";
import image5 from "../assets/image5.svg";
import image6 from "../assets/image6.svg";
import NextButton from "../components/NextButton";

function Down_Face() {
  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          얼굴 선택
        </p>
      </div>
      <div className="my-[14px] flex items-center justify-center">
        <div className="items-center w-[332px] h-[121px] bg-neutral-100 rounded-lg">
          <div className="mx-[14px] my-[14px] flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={image1}
                alt="짱구"
                className="w-11 h-11 rounded-[50px]"
              />
              <div className="mx-[14px] w-[100px] text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
                인물 1
              </div>
            </div>
            <div className="w-6 h-6 relative">
              <NextButton />
            </div>
          </div>
          <div className="flex mx-[14px]">
            <img
              src={image1}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image2}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image3}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image4}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image5}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image6}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
          </div>
        </div>
      </div>
      <div className="my-[14px] flex items-center justify-center">
        <div className="items-center w-[332px] h-[121px] bg-neutral-100 rounded-lg">
          <div className="mx-[14px] my-[14px] flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={image1}
                alt="짱구"
                className="w-11 h-11 rounded-[50px]"
              />
              <div className="mx-[14px] w-[100px] text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
                인물 1
              </div>
            </div>
            <div className="w-6 h-6 relative">
              <NextButton />
            </div>
          </div>
          <div className="flex mx-[14px]">
            <img
              src={image1}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image2}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image3}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image4}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image5}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image6}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
          </div>
        </div>
      </div>
      <div className="my-[14px] flex items-center justify-center">
        <div className="items-center w-[332px] h-[121px] bg-neutral-100 rounded-lg">
          <div className="mx-[14px] my-[14px] flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={image1}
                alt="짱구"
                className="w-11 h-11 rounded-[50px]"
              />
              <div className="mx-[14px] w-[100px] text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
                인물 1
              </div>
            </div>
            <div className="w-6 h-6 relative">
              <NextButton />
            </div>
          </div>
          <div className="flex mx-[14px]">
            <img
              src={image1}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image2}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image3}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image4}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image5}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
            <img
              src={image6}
              alt="짱구"
              className="w-[35px] h-[35px] pr-[7px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-[24px]">
        <button className="w-36 h-9 bg-emerald-200 rounded-lg shadow">
          <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
            생성
          </div>
        </button>
        <button className="w-36 h-9 bg-emerald-200 rounded-lg shadow">
          <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
            취소
          </div>
        </button>
      </div>
    </div>
  );
}

export default Down_Face;
