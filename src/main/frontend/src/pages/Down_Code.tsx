import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal2 from "../components/Modal2";
import ExitButton from "../components/ExitButton";
import axios from "axios";

const DownCode: React.FC = () => {
  const navigate = useNavigate();
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false);
  const [code, setCode] = useState("");
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

  const handleConfirmation = () => {
    if (!/^\d+$/.test(code)) {
      // 입력이 비어 있지 않고 숫자로만 구성되어 있는지 확인
      setIsEmptyModalOpen(true);
      return;
    }
    navigate(`/down_face?verificationCode=${code}&userId=${username}`);
  };

  const handleCancel = () => {
    navigate(`/home/${username}`);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="mb-6">
        <div className="pb-4">
          <div className="mb-1 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            코드를 입력해 주세요.
          </div>
          <div className="w-[288px] text-center text-neutral-900 text-xs font-normal font-['Pretendard'] leading-snug">
            (숫자만 가능)
          </div>
        </div>

        <div className="my-6 w-72 flex items-center justify-center h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="number"
            className="w-40 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="입력해 주세요."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleConfirmation}
            className="mx-2 w-[126px] h-9 bg-emerald-200 rounded-lg shadow"
          >
            <div className="py-2 text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              보기
            </div>
          </button>
          <button
            className="mx-2 w-[126px] h-9 bg-emerald-200 rounded-lg shadow"
            onClick={handleCancel}
          >
            <div className="py-2 text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              취소
            </div>
          </button>
        </div>
      </div>

      {/* 모달 */}
      <Modal2
        isOpen={isEmptyModalOpen}
        onClose={() => setIsEmptyModalOpen(false)}
      >
        <div className="">
          <div className="flex">
            <div className="ml-auto">
              <ExitButton
                text="모달닫기"
                onClick={() => setIsEmptyModalOpen(false)}
              />
            </div>
          </div>
          <div className="my-2 text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            코드를 입력해주세요.
          </div>
          <button
            className="my-4 w-[280px] h-9 bg-neutral-100 rounded-lg border border-stone-300"
            onClick={() => setIsEmptyModalOpen(false)}
          >
            <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              확인
            </div>
          </button>
        </div>
      </Modal2>
    </div>
  );
};

export default DownCode;
