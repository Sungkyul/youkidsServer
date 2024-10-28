import React, { useState, useEffect, useRef } from "react"; // useRef 추가
import { useNavigate } from "react-router-dom";
import profile from "../assets/default_profile.png";
import MenuBar from "../components/MenuBar";
import SearchButton from "../components/SearchButton";
import Notification from "../components/Notification";
import MenuButton from "../components/Menu";
import FixedButton from "../components/FixedButton";
import { useImageContext } from "../components/ImageContext"; // Context import 추가
import axios from "axios"; // Axios import 추가
import {
  AiFillCheckCircle,
  AiFillStar,
  AiOutlineCheckCircle,
  AiOutlineStar,
} from "react-icons/ai"; // 별표 아이콘 import 추가

function Home() {
  const navigate = useNavigate();
  const { album } = useImageContext(); // Context에서 album 가져오기
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState(""); // 사용자 이름 상태 추가
  const [profilePicture, setProfilePicture] = useState(""); // 프로필 사진 상태 추가
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색 활성화 상태 추가
  const searchRef = useRef<HTMLDivElement | null>(null); // 검색창 참조 추가
  const [menuVisible, setMenuVisible] = useState(false); // 메뉴 표시 상
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // 즐겨찾기 필터 상태 추가
  const [favorites, setFavorites] = useState<string[]>([]); // 즐겨찾기 상태 추가
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]); // 선택된 앨범 상태 추가
  const [isSelectMode, setIsSelectMode] = useState(false); // 선택 모드 상태 추가

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev); // 메뉴 상태 토글
  };

  const handleAlbumClick = (entry: { title: string; images: string[] }) => {
    if (!isSelectMode) {
      // 앨범 클릭 시 해당 앨범 화면으로 이동
      navigate(`/album?userId=${username}&${entry.title}`, {
        state: { title: entry.title, images: entry.images },
      });
    }
  };
  // 앨범 선택
  const toggleAlbumSelection = (albumTitle: string) => {
    setSelectedAlbums((prev) => {
      if (prev.includes(albumTitle)) {
        return prev.filter((title) => title !== albumTitle); // 선택 해제
      }
      return [...prev, albumTitle]; // 선택
    });
  };

  // 즐겨찾기 추가/제거
  const toggleFavorite = (albumTitle: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(albumTitle)
        ? prev.filter((fav) => fav !== albumTitle)
        : [...prev, albumTitle];

      // 로컬 스토리지에 즐겨찾기 저장
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 즐겨찾기 불러오기
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7080/dashboard", {
          withCredentials: true,
        });
        setUsername(response.data.username);
        setPhoneNumber(response.data.phoneNumber);
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
  const userAlbums = album.filter((entry) => entry.phoneNumber === phoneNumber);

  // 검색어로 앨범 필터링
  const filteredAlbums = userAlbums
    .filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((entry) =>
      showFavoritesOnly ? favorites.includes(entry.title) : true
    ); // 즐겨찾기 필터 적용

  // 검색창 외부 클릭 이벤트 핸들러
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsSearchActive(false); // 검색창 닫기
      setSearchTerm(""); // 검색 내용 초기화
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectModeToggle = () => {
    if (isSelectMode) {
      setSelectedAlbums([]); // 선택 모드 종료 시 선택된 앨범 초기화
    }
    setIsSelectMode(!isSelectMode); // 선택 모드 토글
  };

  return (
    <div className="pt-2">
      <div className="w-full mx-auto flex justify-between">
        <div style={{ zIndex: 10 }}>
          <MenuBar text="" /> {/* MenuBar 컴포넌트를 사용 */}
        </div>
        <div
          className="mt-2 flex justify-end items-center pr-4"
          ref={searchRef}
        >
          {" "}
          {/* ref 추가 */}
          {isSearchActive && ( // 검색 입력 필드 표시
            <input
              type="text"
              placeholder="앨범명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
              className="mx-2 p-1 w-[200px] border rounded bg-neutral-200"
            />
          )}
          <SearchButton
            text={""}
            onClick={() => setIsSearchActive(!isSearchActive)} // 검색 버튼 클릭 시 검색 활성화 상태 토글
          />
          <MenuButton
            visible={menuVisible} // 메뉴 상태 전달
            onClick={toggleMenu} // 메뉴 토글 함수 전달
            onShowFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)} // 즐겨찾기만 보기 토글 함수 전달
            showFavoritesOnly={showFavoritesOnly} // 즐겨찾기 상태 전달
          />
          {/* <Notification
            text={""}
            onClick={() => {
              navigate(`/noti?userId=${username}`);
            }}
          /> */}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <img
          src={profilePicture || profile}
          alt="프로필"
          className="mb-1 w-[80px] h-[80px] rounded-full"
        />
        <p className="text-[100px] text-center text-lg  ">
          {username || "사용자 이름"}
        </p>
      </div>

      {/* 선택 버튼 추가 */}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleSelectModeToggle} // 선택 모드 토글
      >
        {isSelectMode ? "선택 모드 종료" : "선택 모드 시작"}
      </button>

      {/* 즐겨찾기만 보기 버튼 */}
      {/* <div className="flex justify-end pr-4">
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {showFavoritesOnly ? "전체보기" : "즐겨찾기만 보기"}
        </button>
      </div> */}

      {/* 저장된 앨범 표시 */}
      <div className="flex item-center space-x-6">
        <div className="ml-5 flex flex-wrap">
          {filteredAlbums.map((entry, index) => (
            <div
              key={index}
              className="relative w-[125px] h-[125px] rounded-lg mx-4 mb-10"
            >
              <img
                src={entry.images[0]} // 첫 번째 이미지만 표시
                alt={`앨범 ${entry.title}`}
                className="w-[125px] h-[125px] rounded-lg"
                onClick={() => handleAlbumClick(entry)}
              />
              {isSelectMode && ( // 선택 모드일 때만 체크 표시
                <div className="absolute bottom-1 right-1">
                  <button
                    className={`p-1 rounded-full ${
                      selectedAlbums.includes(entry.title)
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // 앨범 클릭 방지
                      toggleAlbumSelection(entry.title);
                    }}
                  >
                    {selectedAlbums.includes(entry.title) ? (
                      <AiFillCheckCircle color="lightblue" size={16} /> // 노란색 별 아이콘
                    ) : (
                      <AiOutlineCheckCircle color="gray" size={16} /> // 회색 별 아이콘
                    )}
                  </button>
                </div>
              )}
              <div className="flex items-center pt-1">
                {/* 즐겨찾기 아이콘 */}
                <div
                  className="cursor-pointer mr-1"
                  onClick={(e) => {
                    e.stopPropagation(); // 앨범 클릭 방지
                    toggleFavorite(entry.title);
                  }}
                >
                  {favorites.includes(entry.title) ? (
                    <AiFillStar color="lightgreen" size={16} /> // 노란색 별 아이콘
                  ) : (
                    <AiOutlineStar color="gray" size={16} /> // 회색 별 아이콘
                  )}
                </div>
                <p className="text-xs text-left">{entry.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 앨범 수 표시 */}
      {isSelectMode && ( // 선택 모드일 때만 선택된 앨범 수 표시
        <div className="fixed bottom-4 left-4 bg-gray-200 p-3 rounded-lg">
          선택된 앨범 수: {selectedAlbums.length}
          <button
            className="ml-2 p-1 bg-red-500 text-white rounded"
            onClick={() => setSelectedAlbums([])} // 선택 해제 버튼
          >
            선택 해제
          </button>
        </div>
      )}

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
