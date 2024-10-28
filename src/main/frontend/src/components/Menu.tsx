import React from "react";
import MenuIcon from "../assets/menu.svg";
import CheckIcon from "../assets/check.svg";

interface MenuButtonProps {
  visible: boolean; // 메뉴의 표시 여부
  onClick: () => void; // 메뉴 열기/닫기 함수
  onShowFavorites: () => void; // 즐겨찾기만 보기 함수
  showFavoritesOnly: boolean; // 즐겨찾기 상태 여부
}

const MenuButton: React.FC<MenuButtonProps> = ({
  visible,
  onClick,
  onShowFavorites,
  showFavoritesOnly,
}) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div className="w-[22px]">
      <button onClick={handleButtonClick}>
        <img src={MenuIcon} alt="메뉴" />
      </button>
      {visible && (
        <div className="mr-4 mt-1 absolute top-12 right-0 bg-white shadow-md rounded-md z-50">
          <ul className="flex flex-col py-2">
            <li
              className="py-1 pl-3 hover:bg-gray-200 cursor-pointer flex items-center"
              onClick={onShowFavorites}
              style={{ width: "100px" }}
            >
              <span className="">즐겨찾기</span>
              {showFavoritesOnly && (
                <img src={CheckIcon} alt="체크 표시" className="ml-2 w-4 h-4" />
              )}{" "}
            </li>
            <li className="py-1 px-3 hover:bg-gray-200 cursor-pointer">수정</li>
            <li className="py-1 px-3 hover:bg-gray-200 cursor-pointer">삭제</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
