import React, { useState } from "react";
import Modal from "../components/Modal";
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import image3 from "../assets/image3.svg";
import image4 from "../assets/image4.svg";
import image5 from "../assets/image5.svg";
import image6 from "../assets/image6.svg";
import AddButton from "../components/AddButton";

function Album() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달이 열려있는지 상태를 관리

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className=" text-[20px] text-center font-bold">앨범 생성</p>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-left font-bold ">운동회</p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="text-right text-xs">23.05.16</p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4">
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

          <div className="pr-6 pt-1.5">
            <AddButton text="앨범생성" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-left font-bold ">운동회</p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="text-right text-xs">23.05.16</p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4">
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

          <div className="pr-6 pt-1.5">
            <AddButton text="앨범생성" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-left font-bold ">운동회</p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="text-right text-xs">23.05.16</p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4">
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

          <div className="pr-6 pt-1.5">
            <AddButton text="앨범생성" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-left font-bold ">운동회</p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="text-right text-xs">23.05.16</p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4">
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

          <div className="pr-6 pt-1.5">
            <AddButton text="앨범생성" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-left font-bold ">운동회</p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="text-right text-xs">23.05.16</p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4">
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

          <div className="pr-6 pt-1.5">
            <AddButton text="앨범생성" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex parent justify-between pt-2">
          <div className="parent pl-4">
            <p className="text-left font-bold ">운동회</p>
          </div>
          <div className="parent pr-4 pt-1">
            <p className="text-right text-xs">23.05.16</p>
          </div>
        </div>

        <div className="flex justify-between pb-2">
          <div className="flex pl-4">
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

          <div className="pr-6 pt-1.5">
            <AddButton text="앨범생성" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* 모달 내용 */}
        <div className="flex items-center justify-center pb-2">
          <button
            className="text-sm pr-6"
            onClick={() => setIsModalOpen(false)}
          >
            취소
          </button>
          <div className="bg-white w-[180px] h-[30px] rounded-lg text-center flex items-center justify-center">
            운동회
          </div>
          <button
            className="text-sm pl-6"
            onClick={() => setIsModalOpen(false)}
          >
            저장
          </button>
        </div>
        <div className="flex justify-between items-center pt-1">
          <img src={image1} alt="짱구" className="w-[90px] h-[90px] " />
          <img src={image2} alt="짱구" className="w-[90px] h-[90px] " />
          <img src={image3} alt="짱구" className="w-[90px] h-[90px] " />
        </div>
        <div className="flex justify-between items-center pt-1">
          <img src={image4} alt="짱구" className="w-[90px] h-[90px] " />
          <img src={image5} alt="짱구" className="w-[90px] h-[90px] " />
          <img src={image6} alt="짱구" className="w-[90px] h-[90px] " />
        </div>
        <div className="flex justify-between items-center pt-1">
          <img src={image1} alt="짱구" className="w-[90px] h-[90px] " />
          <img src={image2} alt="짱구" className="w-[90px] h-[90px] " />
          <img src={image3} alt="짱구" className="w-[90px] h-[90px] " />
        </div>
      </Modal>

      <div className="justify-center py-4">
        <p className="text-xs text-center text-gray-600">
          최근 30일 안에 전송 받은 사진만 볼 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default Album;
