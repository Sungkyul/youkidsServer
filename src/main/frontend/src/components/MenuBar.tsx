import React, { useState, useRef, useEffect } from "react";
import profile from "../assets/yr.jpeg";
import 오른쪽화살표 from "../assets/오른쪽 화살표.svg";
import 전송기록 from "../assets/전송기록.svg";
import 즐겨찾기 from "../assets/즐겨찾기.svg";
import 휴지통 from "../assets/휴지통.svg";
import 공지 from "../assets/공지.svg";
import 설정 from "../assets/설정.svg";
import Menu from "../assets/menubar.svg";

interface MenuBarProps {
  text: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ text }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // 메뉴의 표시 여부 상태
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 바 참조를 위한 useRef

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

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible); // 메뉴의 표시 여부를 토글합니다.
  };

  return (
    <div className="bg-white p-4" ref={menuRef}>
      <button onClick={handleMenuClick}>
        <img src={Menu} alt="메뉴 바" />
      </button>

      {/* 메뉴가 표시되면 아래의 내용을 보여줍니다. */}
      {isMenuVisible && (
        <div className="absolute top-0 left-0 h-full w-3/4 bg-white shadow-md p-4 flex justify-center items-center">
          {/* 메뉴에 해당하는 내용 */}
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center py-8 pl-2 w-full">
              <img
                src={profile}
                alt="김연아"
                className="w-[50px] h-[50px] rounded-full"
              />
              <p className="text-sm text-left pl-4 pr-4 font-bold">백예린</p>
              <div className="flex justify-end flex-1">
                <img
                  src={오른쪽화살표}
                  alt="오른쪽화살표"
                  className="w-[24px] h-[24px]"
                />
              </div>
            </div>

            <div className="border-t border-gray-300 w-full pb-2"></div>
            <div className="flex flex-col justify-items-start p-2 w-full h-full">
              <div className="flex items-center ">
                <img
                  src={전송기록}
                  alt="전송기록"
                  className="w-[24px] h-[24px]"
                />
                <p className="text-xs text-left pl-4">전송기록</p>
              </div>
              <div className="flex items-center">
                <img
                  src={즐겨찾기}
                  alt="즐겨찾기"
                  className="w-[24px] h-[24px]"
                />
                <p className="text-xs text-left pl-4">즐겨찾기</p>
              </div>
              <div className="flex items-center">
                <img src={휴지통} alt="휴지통" className="w-[24px] h-[24px]" />
                <p className="text-xs text-left pl-4">휴지통</p>
              </div>
              <div className="flex items-center">
                <img src={공지} alt="공지" className="w-[24px] h-[24px]" />
                <p className="text-xs text-left pl-4">공지</p>
              </div>
              <div className="flex items-center">
                <img src={설정} alt="설정" className="w-[24px] h-[24px]" />
                <p className="text-xs text-left pl-4">설정</p>
              </div>
            </div>
            <div className="border-t border-gray-300 w-full pb-4"></div>
            <div className="w-full h-full p-4">
              <p className="text-xs pb-1">이용안내</p>
              <p className="text-xs pb-1">고객센터</p>
              <p className="text-xs ">정보수정제안</p>
              <p className="text-xs pt-32 text-right">로그아웃</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
