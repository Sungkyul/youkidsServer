import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import axios from "axios";
import profile from "../assets/default_profile.png";
import 오른쪽화살표 from "../assets/오른쪽 화살표.svg";
import 전송기록 from "../assets/전송기록.svg";
import 즐겨찾기 from "../assets/즐겨찾기.svg";
import NoPreview from "../assets/No Preview.svg";
import 휴지통 from "../assets/휴지통.svg";
import 공지 from "../assets/공지.svg";
import 설정 from "../assets/설정.svg";
import Menu from "../assets/menubar.svg";

interface MenuBarProps {
  text: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ text }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // 메뉴의 표시 여부 상태
  const [username, setUsername] = useState(""); // 사용자 이름 상태
  const [profilePicture, setProfilePicture] = useState(profile); // 프로필 사진 상태, 기본 사진으로 초기화
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 바 참조를 위한 useRef
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 메뉴 바 외부를 클릭한 경우에만 메뉴를 닫습니다.
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 사용자 정보를 가져오는 함수
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:7080/dashboard", {
        withCredentials: true,
      });
      setUsername(response.data.username);
      // 프로필 사진 URL 설정
      const profilePictureUrl = response.data.profilePicture
        ? `http://localhost:7080/files/${response.data.profilePicture}`
        : profile; // 기본 사진
      setProfilePicture(profilePictureUrl);
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // 컴포넌트가 마운트될 때 사용자 정보 가져오기
  }, []);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible); // 메뉴의 표시 여부를 토글합니다.
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직 추가 (예: 세션 삭제, API 호출 등)
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="bg-white p-4" ref={menuRef}>
      <button onClick={handleMenuClick}>
        <img src={Menu} alt="메뉴 바" />
      </button>

      {/* 메뉴가 표시되면 아래의 내용을 보여줍니다. */}
      {isMenuVisible && (
        <div className="absolute top-0 left-0 h-full w-3/5 bg-white shadow-md p-4 flex justify-center items-center">
          {/* 메뉴에 해당하는 내용 */}
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center py-8 pl-2 w-full">
              <img
                src={profilePicture}
                alt="프로필"
                className="w-[50px] h-[50px] rounded-full"
              />
              <p className="text-sm text-left pl-4 pr-4 font-bold">
                {username || "사용자 이름"}
              </p>
              <div
                className="flex justify-end flex-1"
                onClick={() => {
                  navigate(`/usersettings?userId=${username}`);
                }}
              >
                <img
                  src={오른쪽화살표}
                  alt="오른쪽화살표"
                  className="w-[24px] h-[24px]"
                />
              </div>
            </div>

            <div className="border-t border-gray-300 w-full pb-4"></div>
            <div className="flex flex-col justify-items-star p-2 w-full h-full">
              <div className="flex items-center my-1 w-[90px]">
                <img
                  src={전송기록}
                  alt="전송기록"
                  className="w-[24px] h-[24px]"
                />
                <p className="text-xs text-left pl-4">전송기록</p>
              </div>
              <div
                className="flex items-center my-1 w-[90px]"
                onClick={() => {
                  navigate(`/favorites?userId=${username}`);
                }}
              >
                <img
                  src={즐겨찾기}
                  alt="즐겨찾기"
                  className="w-[24px] h-[24px]"
                />
                <p className="text-xs text-left pl-4">즐겨찾기</p>
              </div>
              <div
                className="flex items-center my-1 w-[90px]"
                onClick={() => {
                  navigate(`/hiddenalbum?userId=${username}`);
                }}
              >
                <img
                  src={NoPreview}
                  alt="NoPreview"
                  className="w-[24px] h-[24px]"
                />
                <p className="text-xs text-left pl-4">숨긴 앨범</p>
              </div>
              <div
                className="flex items-center my-1 w-[90px]"
                onClick={() => {
                  navigate(`/deletedalbum?userId=${username}`);
                }}
              >
                <img src={휴지통} alt="휴지통" className="w-[24px] h-[24px]" />
                <p className="text-xs text-left pl-4">휴지통</p>
              </div>
              <div
                className="flex items-center my-1 w-[90px]"
                onClick={() => {
                  navigate(`/notice?userId=${username}`);
                }}
              >
                <img src={공지} alt="공지" className="w-[24px] h-[24px]" />
                <p className="text-xs text-left pl-4">공지</p>
              </div>
              <div
                className="flex items-center my-1 w-[90px]"
                onClick={() => {
                  navigate(`/setting?userId=${username}`);
                }}
              >
                <img src={설정} alt="설정" className="w-[24px] h-[24px]" />
                <p className="text-xs text-left pl-4">설정</p>
              </div>
            </div>
            <div className="border-t border-gray-300 w-full"></div>
            <div className="w-full h-full px-4">
              <p
                className="text-xs pt-4 pb-2"
                onClick={() => {
                  navigate(`/guide?userId=${username}`);
                }}
              >
                이용안내
              </p>
              <p
                className="text-xs pb-2"
                onClick={() => {
                  navigate(`/customerservice?userId=${username}`);
                }}
              >
                고객센터
              </p>
              <p
                className="text-xs"
                onClick={() => {
                  navigate(`/updatesuggestion?userId=${username}`);
                }}
              >
                정보 수정 제안
              </p>
              <p className="pt-32 text-xs"></p>
              <p className="text-xs text-right" onClick={handleLogout}>
                로그아웃
              </p>{" "}
              {/* 클릭 이벤트 추가 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
