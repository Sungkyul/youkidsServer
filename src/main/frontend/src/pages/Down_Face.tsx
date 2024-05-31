import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import image3 from "../assets/image3.svg";
import image4 from "../assets/image4.svg";
import image5 from "../assets/image5.svg";
import image6 from "../assets/image6.svg";
import NextButton from "../components/NextButton";

function Down_Face() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달이 열려있는지 상태를 관리

  const [selectedFace, setSelectedFace] = useState(null);
  const navigate = useNavigate();

  const faces = [
    { id: 1, image: image1, name: "인물 1" },
    { id: 2, image: image1, name: "인물 2" },
    { id: 3, image: image1, name: "인물 3" },
  ];

  const handleSelectFace = (id) => {
    setSelectedFace(id);
  };

  const handleConfirm = () => {
    navigate("/Home");
  };

  const handleCancel = () => {
    // Navigate to the cancel route
    navigate("/Down_Code"); // Replace with your actual route
  };

  const handleOpenModal = () => {
    if (selectedFace !== null) {
      setIsModalOpen(true);
    } else {
      alert("얼굴을 선택해 주세요.");
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          얼굴 선택
        </p>
      </div>
      {faces.map((face) => (
        <div
          key={face.id}
          className={`mx-[14px] my-[14px] rounded-lg flex items-center justify-center cursor-pointer ${selectedFace === face.id ? "bg-zinc-200" : "bg-neutral-100 "}`}
          onClick={() => handleSelectFace(face.id)}
        >
          <div className="items-center w-[332px] h-[121px]">
            <div className="mx-[14px] my-[14px] flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={face.image}
                  alt={face.name}
                  className="w-11 h-11 rounded-[50px]"
                />
                <div className="mx-[14px] w-[100px] text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
                  {face.name}
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
      ))}
      <div className="flex justify-between mx-[24px]">
        <button
          className="w-36 h-9 bg-emerald-200 rounded-lg shadow"
          onClick={handleOpenModal}
        >
          <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
            생성
          </div>
        </button>
        <button
          className="w-36 h-9 bg-emerald-200 rounded-lg shadow"
          onClick={handleCancel}
        >
          <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
            취소
          </div>
        </button>
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
          <input
            className="bg-white w-[180px] h-[30px] rounded-lg text-center flex items-center justify-center"
            placeholder="제목"
          ></input>
          <button className="text-sm pl-6" onClick={handleConfirm}>
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
    </div>
  );
}

export default Down_Face;
