import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImageContext } from "../components/ImageContext"; // Context에서 album 가져오기
import BeforeButton from "../components/BeforeButton";
import { TiTrash } from "react-icons/ti";
import axios from "axios";

const DeletedAlbum = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { album } = useImageContext(); // Context에서 album 가져오기
  const [deletedAlbums, setDeletedAlbums] = useState<string[]>([]);

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
    const storedDeletedAlbums = localStorage.getItem(
      `deletedAlbums_${username}`
    );
    if (storedDeletedAlbums) {
      setDeletedAlbums(JSON.parse(storedDeletedAlbums));
    }
  }, [username]);

  // 사용자 ID로 앨범 필터링
  const userDeletedAlbums = album.filter((entry) =>
    deletedAlbums.includes(entry.title)
  );

  const handleAlbumClick = (entry: { title: string; images: string[] }) => {
    // 앨범 클릭 시 해당 앨범 화면으로 이동
    navigate(`/album?userId=${username}&${entry.title}`, {
      state: { title: entry.title, images: entry.images },
    });
  };

  const handleRecoverAlbum = (albumTitle: string) => {
    // 특정 앨범 복구 로직
    const updatedDeletedAlbums = deletedAlbums.filter(
      (title) => title !== albumTitle
    );
    setDeletedAlbums(updatedDeletedAlbums); // 상태에서 해당 앨범 삭제

    // 로컬 저장소 업데이트
    localStorage.setItem(
      `deletedAlbums_${username}`,
      JSON.stringify(updatedDeletedAlbums)
    );
  };

  const handleRecoverAll = () => {
    // 전체 복구 로직
    setDeletedAlbums([]); // 상태에서 삭제된 앨범 복구
    localStorage.removeItem(`deletedAlbums_${username}`); // 로컬 저장소에서 제거
    alert("모든 앨범이 복구되었습니다.");
  };

  const hardDelete = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?"); // 사용자에게 삭제 확인 요청

    if (confirmDelete) {
      // trashAlbums로 이동
      const storedTrashAlbums = localStorage.getItem(`trashAlbums_${username}`);
      const trashAlbums = storedTrashAlbums
        ? JSON.parse(storedTrashAlbums)
        : [];

      // deletedAlbums의 내용을 trashAlbums로 옮기기
      const updatedTrashAlbums = [...trashAlbums, ...deletedAlbums];

      // 로컬 스토리지에 trashAlbums 저장
      localStorage.setItem(
        `trashAlbums_${username}`,
        JSON.stringify(updatedTrashAlbums)
      );

      // deletedAlbums를 비우고 상태 및 로컬 스토리지에서 삭제
      setDeletedAlbums([]);
      localStorage.removeItem(`deletedAlbums_${username}`);

      alert("모든 앨범이 완전히 삭제되었습니다.");
    } else {
      alert("삭제가 취소되었습니다."); // 삭제가 취소된 경우
    }
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
          휴지통
        </p>
        <div className="m-6"></div>
      </div>

      <div className="mt-6 ml-5 flex flex-wrap">
        {userDeletedAlbums.length > 0 ? (
          userDeletedAlbums.map((entry, index) => (
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
                  <TiTrash color="lightgreen" size={16} />{" "}
                  {/* 초록색 휴지통 아이콘 */}
                </div>
                <p className="text-xs text-left">{entry.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p>삭제한 앨범이 없습니다.</p>
        )}
      </div>

      {userDeletedAlbums.length > 0 && (
        <div className="mt-2 flex justify-center">
          <div className="mx-2">
            <button
              className="flex items-center justify-center w-full h-[50px] bg-emerald-200 rounded-lg"
              onClick={handleRecoverAll}
            >
              <div className="px-10 text-center text-base font-normal font-['Pretendard'] leading-snug">
                전체 복구
              </div>
            </button>
          </div>
          <div className="mx-2">
            <button
              className="flex items-center justify-center w-full h-[50px] bg-emerald-200 rounded-lg"
              onClick={hardDelete}
            >
              <div className="px-10 text-center text-base font-normal font-['Pretendard'] leading-snug">
                완전 삭제
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletedAlbum;
