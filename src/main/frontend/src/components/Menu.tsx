import React from "react";
import MenuIcon from "../assets/menu.svg";

interface MenuButtonProps {
  visible: boolean; // 메뉴의 표시 여부
  onClick: () => void; // 메뉴 열기/닫기 함수
}

const MenuButton: React.FC<MenuButtonProps> = ({ visible, onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div className="m-4 w-[22px]">
      <button onClick={handleButtonClick}>
        <img src={MenuIcon} alt="메뉴" />
      </button>
      {visible && (
        <div className="absolute top-12 right-0 bg-white shadow-md rounded-md z-50">
          <ul className="flex flex-col p-2">
            <li className="py-1 px-3 hover:bg-gray-200 cursor-pointer">
              즐겨찾기
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
