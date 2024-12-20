import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImageContext } from "../components/ImageContext"; // Context에서 album 가져오기
import BeforeButton from "../components/BeforeButton";
import { AiOutlineEyeInvisible } from "react-icons/ai"; // 눈 아이콘
import axios from "axios";

const HiddenAlbum = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { album } = useImageContext(); // Context에서 album 가져오기
  const [hiddenAlbums, setHiddenAlbums] = useState<string[]>([]);

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

  useEffect(() => {
    const storedHiddenAlbums = localStorage.getItem(`hiddenAlbums_${username}`);
    if (storedHiddenAlbums) {
      setHiddenAlbums(JSON.parse(storedHiddenAlbums));
    }
  }, [username]);

  // 사용자 ID로 앨범 필터링
  const userHiddenAlbums = album.filter((entry) =>
    hiddenAlbums.includes(entry.title)
  );

  const handleAlbumClick = (entry: { title: string; images: string[] }) => {
    // 앨범 클릭 시 해당 앨범 화면으로 이동
    navigate(`/album?userId=${username}&${entry.title}`, {
      state: { title: entry.title, images: entry.images },
    });
  };

  const handleRecoverAlbum = (albumTitle: string) => {
    // 특정 앨범 복구 로직
    const updatedHiddenAlbums = hiddenAlbums.filter(
      (title) => title !== albumTitle
    );
    setHiddenAlbums(updatedHiddenAlbums); // 상태에서 해당 앨범 삭제

    // 로컬 저장소 업데이트
    localStorage.setItem(
      `hiddenAlbums_${username}`,
      JSON.stringify(updatedHiddenAlbums)
    );
  };

  const handleRecoverAll = () => {
    // 전체 복구 로직
    setHiddenAlbums([]); // 상태에서 삭제된 앨범 복구
    localStorage.removeItem(`hiddenAlbums_${username}`); // 로컬 저장소에서 제거
    alert("모든 숨긴 앨범이 해제되었습니다.");
  };

  return (
    <div className="mx-full mx-auto pt-2">
      <div className="w-full mx-auto flex justify-between">
        <BeforeButton
          text={""}
          onClick={() => {
            navigate(`/home?userId=${username}`);
          }}
        ></BeforeButton>
        <p className="py-4 text-center text-neutral-900 text-[20px] font-semibold font-['Pretendard'] leading-snug">
          숨긴 앨범
        </p>
        <div className="m-6"></div>
      </div>

      <div className="mt-6 ml-5 flex flex-wrap">
        {userHiddenAlbums.length > 0 ? (
          userHiddenAlbums.map((entry, index) => (
            <div
              key={index}
              className="w-[125px] h-[125px] rounded-lg mx-4 mb-10 cursor-pointer"
              onClick={() => handleAlbumClick(entry)}
            >
              <img
                src={entry.images[0]} // 첫 번째 이미지만 표시
                alt={`앨범 ${entry.title}`}
                className="w-[125px] h-[125px] rounded-lg"
              />
              <div className="flex items-center pt-1">
                <div
                  className="cursor-pointer mr-1"
                  onClick={(e) => {
                    e.stopPropagation(); // 앨범 클릭 방지
                    handleRecoverAlbum(entry.title);
                  }}
                >
                  <AiOutlineEyeInvisible color="lightgreen" size={16} />{" "}
                  {/* 초록색 눈 아이콘 */}
                </div>
                <p className="text-xs text-left">{entry.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p>숨긴 앨범이 없습니다.</p>
        )}
      </div>
      {userHiddenAlbums.length > 0 && (
        <div className="mt-2 flex justify-center">
          <button
            className="flex items-center justify-center w-72 h-9 bg-emerald-200 rounded-lg"
            onClick={handleRecoverAll}
          >
            <div className="text-center text-base font-normal font-['Pretendard'] leading-snug">
              전체 해제
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default HiddenAlbum;
