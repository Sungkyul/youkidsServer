import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/default_profile.png"; // yr->profile 수정해야됨
import MenuBar from "../components/MenuBar";
import SearchButton from "../components/SearchButton";
import Notification from "../components/Notification";
import FixedButton from "../components/FixedButton";
import { useImageContext } from "../components/ImageContext"; // Context import 추가
import axios from "axios"; // Axios import 추가

function Home() {
  const navigate = useNavigate();
  const { album } = useImageContext(); // Context에서 album 가져오기
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState(""); // 사용자 이름 상태 추가
  const [profilePicture, setProfilePicture] = useState(""); // 프로필 사진 상태 추가
  const [userId, setUserId] = useState("");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAlbumClick = (entry: { title: string; images: string[] }) => {
    // 앨범 클릭 시 해당 앨범 화면으로 이동
    navigate("/Album", { state: { title: entry.title, images: entry.images } });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7080/dashboard", {
          withCredentials: true,
        });
        setUsername(response.data.username);
        setUserId(response.data.userId);
        // 절대 경로로 프로필 사진 URL을 설정
        const profilePictureUrl = response.data.profilePicture
          ? `http://localhost:7080/files/${response.data.profilePicture}` // 파일 경로를 절대 경로로 설정
          : profile; // 기본 프로필 사진

        setProfilePicture(profilePictureUrl);
        console.log("Profile Picture URL set to:", profilePictureUrl); // 로그 추가
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // 사용자 ID로 앨범 필터링
  const userAlbums = album.filter((entry) => entry.userId === userId);

  return (
    <div className="pt-2">
      <div className="w-full mx-auto flex justify-between">
        <MenuBar text="" /> {/* MenuBar 컴포넌트를 사용 */}
        <div className="mt-2 flex justify-end items-center pr-4">
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
        <img
          src={profilePicture || profile}
          alt="프로필"
          className="w-[80px] h-[80px] rounded-full"
        />
        <p className="text-[100px] text-center text-lg  ">
          {username || "사용자 이름"}
        </p>
      </div>

      {/* 저장된 앨범 표시 */}
      <div className="flex item-center space-x-6">
        <div className="ml-5 flex flex-wrap">
          {userAlbums.map((entry, index) => (
            <div
              key={index}
              className="w-[125px] h-[125px] rounded-lg mx-4 mb-10"
              onClick={() => handleAlbumClick(entry)}
            >
              <img
                src={entry.images[0]} // 첫 번째 이미지만 표시
                alt={`앨범 ${entry.title}`}
                className="w-[125px] h-[125px] rounded-lg"
              />
              <p className="text-xs text-left pt-1">{entry.title}</p>
            </div>
          ))}
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
