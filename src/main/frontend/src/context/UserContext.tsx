// src/context/UserContext.tsx

import React, { createContext, useContext, useState } from "react";

// 사용자 정보를 저장할 타입 정의
interface User {
  id: string; // 사용자 ID
  userIdPhone: string; // 사용자 전화번호
  userName: string; // 사용자 이름
  userPassword: string; // 사용자 비밀번호 (일반적으로 클라이언트에서 저장하지 않음)
  userProfileFileName: string; // 사용자 프로필 사진 파일 이름
  userProfileFilePath: string; // 사용자 프로필 사진 파일 경로
}

// 컨텍스트의 타입 정의
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// UserContext 생성
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider 컴포넌트
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext 사용하기 위한 커스텀 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
