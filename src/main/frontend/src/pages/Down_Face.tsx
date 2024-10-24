import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import NextButton from "../components/NextButton";
import { useImageContext } from "../components/ImageContext"; // Context import 추가
import axios from "axios";
import { AxiosError } from "axios"; // AxiosError import 추가

interface GroupedImagesResponse {
  [groupId: string]: string[]; // groupId는 string, images는 string[] 형태
}

const DownFace: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroupImages, setSelectedGroupImages] = useState<string[]>([]); // 선택된 그룹의 이미지를 저장할 상태 추가
  const location = useLocation();
  const navigate = useNavigate();
  const { imagePaths } = location.state || { imagePaths: [] };
  const { saveImages } = useImageContext(); // Context에서 saveImages 함수 가져오기
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // username을 phoneNumber로 변경

  const params = new URLSearchParams(location.search);
  const verificationCode = params.get("verificationCode") || "";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7080/dashboard", {
          withCredentials: true,
        });
        setUsername(response.data.username);
        setPhoneNumber(response.data.phoneNumber);
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleConfirm = () => {
    navigate(`/home?userId=${username}`);
  };

  const handleCancel = () => {
    navigate(`/down_code?userId=${username}`);
  };

  const handleOpenModal = (images: string[]) => {
    setSelectedGroupImages(images); // 선택된 그룹의 이미지를 저장
    setIsModalOpen(true);
  };

  const [groupedImages, setGroupedImages] = useState<Map<string, string[]>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    const fetchImagesByGroup = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:7080/getImagesByGroup?verificationCode=${verificationCode}`
        );
        if (response.ok) {
          const data: GroupedImagesResponse = await response.json(); // 응답 데이터 타입 지정
          const updatedData = Object.fromEntries(
            Object.entries(data).map(([groupId, images]) => [
              groupId,
              images.map((image) => `http://localhost:7080${image}`), // 서버 URL 추가
            ])
          );
          setGroupedImages(new Map(Object.entries(updatedData)));
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

  const handleGroupClick = (groupId: string, images: string[]) => {
    setSelectedGroup(groupId === selectedGroup ? null : groupId);
    if (groupId === selectedGroup) {
      setSelectedGroupImages([]); // 선택 해제 시 이미지를 비웁니다.
    } else {
      setSelectedGroupImages(images); // 그룹 클릭 시 해당 그룹 이미지를 저장
    }
  };

  const handleSave = async (title: string) => {
    try {
      const response = await axios.post(
        `http://localhost:7080/albums/create?userIdPhone=${phoneNumber}&title=${title}`, // 쿼리 매개변수로 userIdPhone과 title 추가
        selectedGroupImages // photoUrls는 본문으로 보내기
      );

      const createdAlbum = response.data; // 생성된 앨범 데이터
      console.log("생성된 앨범 ID:", createdAlbum.id); // 앨범 ID 콘솔 출력

      saveImages(selectedGroupImages, title, phoneNumber, createdAlbum.id);

      setIsModalOpen(false); // 모달 닫기
      navigate(`/home?userId=${username}`);
    } catch (error) {
      const axiosError = error as AxiosError; // error를 AxiosError 타입으로 캐스팅
      console.error("앨범 생성 중 오류 발생:", axiosError.response?.data); // 오류 응답 데이터 추가
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          얼굴 선택
        </p>
      </div>

      <div className="pt-2">
        {Array.from(groupedImages.entries()).map(([groupId, images]) => (
          <div
            key={groupId}
            className={`mx-[14px] my-[14px] rounded-lg flex items-center cursor-pointer ${selectedGroup === groupId ? "bg-emerald-200" : "bg-neutral-100"}`}
            onClick={() => handleGroupClick(groupId, images)} // 그룹 클릭 시 이미지를 전달
          >
            <div className="items-center h-[108px]">
              <div className="ml-4 mt-2 pb-2 font-medium">
                <p>인물 {parseInt(groupId) + 1}</p>
              </div>
              <div className="mx-[14px] my-[14px] flex items-center justify-between">
                <div className="flex items-center overflow-x-auto max-w-80">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`그룹 ${groupId}의 이미지 ${index}`}
                      className="w-11 h-11 mr-1 rounded-[0px]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error(`에러 발생 이미지: ${target.src}`); // 에러 발생한 이미지 URL 출력
                      }}
                    />
                  ))}
                </div>
                {/* <div className="w-6 h-6 relative">
                  <NextButton />
                </div> */}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between mx-[24px]">
          <button
            className="w-36 h-9 bg-emerald-200 rounded-lg shadow"
            onClick={() => handleOpenModal(selectedGroupImages)} // 선택된 그룹의 이미지를 모달에 전달
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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imagePaths={selectedGroupImages} // 선택된 그룹의 이미지를 모달에 전달
          onSave={handleSave} // 저장 함수 전달
        />
      </div>
    </div>
  );
};

export default DownFace;
