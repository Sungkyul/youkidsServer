import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import NextButton from "../components/NextButton";

const DownFace: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달이 열려있는지 상태를 관리
  const location = useLocation();
  const navigate = useNavigate();
  const { imagePaths } = location.state || { imagePaths: [] };

  const params = new URLSearchParams(location.search);
  const verificationCode = params.get("verificationCode") || "";

  const handleConfirm = () => {
    navigate("/Home");
  };

  const handleCancel = () => {
    navigate("/Down_Code");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [groupedImages, setGroupedImages] = useState<Map<string, string[]>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchImagesByGroup = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:7080/getImagesByGroup?verificationCode=${verificationCode}`
        );
        if (response.ok) {
          const data = await response.json();
          setGroupedImages(new Map(Object.entries(data))); // JSON을 Map으로 변환
        } else {
          setError("그룹화된 이미지를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("오류: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagesByGroup();
  }, [verificationCode]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          얼굴 선택
        </p>
      </div>
      <div>
        {Array.from(groupedImages.entries()).map(([groupId, images]) => (
          <div
            key={groupId}
            className={`mx-[14px] my-[14px] rounded-lg flex items-center justify-center cursor-pointer bg-neutral-100 `}
          >
            <div className="items-center w-[332px] h-[121px]">
              <div className="ml-4 mt-2">
                <p>그룹: {groupId}</p>
                <br />
              </div>
              <div className="mx-[14px] my-[14px] flex items-center justify-between">
                <div className="flex items-center">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`그룹 ${groupId}의 이미지 ${index}`}
                      className="w-11 h-11 mr-1 rounded-[0px]"
                    />
                  ))}
                </div>
                <div className="w-6 h-6 relative">
                  <NextButton />
                </div>
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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imagePaths={imagePaths} // 이미지 경로를 모달에 전달
        />
      </div>
    </div>
  );
};

export default DownFace;
