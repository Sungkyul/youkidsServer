import React, { useEffect, useRef } from "react";
import MenuIcon from "../assets/menu.svg";
import CheckIcon from "../assets/check.svg";

interface MenuButtonProps {
  visible: boolean; // 메뉴의 표시 여부
  onClick: () => void; // 메뉴 열기/닫기 함수
  onShowFavorites: () => void; // 즐겨찾기만 보기 함수
  showFavoritesOnly: boolean; // 즐겨찾기 상태 여부
  onSelectMode: () => void; // 선택 모드로 전환하는 함수
}

const MenuButton: React.FC<MenuButtonProps> = ({
  visible,
  onClick,
  onShowFavorites,
  showFavoritesOnly,
  onSelectMode,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null); // 메뉴 리스트를 참조하기 위한 ref

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClick(); // 메뉴를 닫는 함수 호출
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [visible]);

  const handleButtonClick = () => {
    onClick();
  };

  const handleFavoriteClick = () => {
    onShowFavorites();
    onClick();
  };
  const handleSelectClick = () => {
    onSelectMode(); // 선택 모드로 전환
    onClick(); // 메뉴 닫기
  };

  return (
    <div className="w-[22px]">
      <button onClick={handleButtonClick}>
        <img src={MenuIcon} alt="메뉴" />
      </button>
      {visible && (
        <div
          ref={menuRef}
          className="mr-4 mt-1 absolute top-12 right-0 bg-white shadow-md rounded-md z-50"
        >
          <ul className="flex flex-col py-2">
            <li
              className="py-1 pl-3 hover:bg-gray-200 cursor-pointer flex items-center"
              onClick={handleFavoriteClick}
              style={{ width: "100px" }}
            >
              <span className="">즐겨찾기</span>
              {showFavoritesOnly && (
                <img src={CheckIcon} alt="체크 표시" className="ml-2 w-4 h-4" />
              )}{" "}
            </li>
            <li
              className="py-1 px-3 hover:bg-gray-200 cursor-pointer"
              onClick={handleSelectClick}
            >
              선택
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
