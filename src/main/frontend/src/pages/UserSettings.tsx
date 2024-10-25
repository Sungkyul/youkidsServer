import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/default_profile.png";
import BeforeButton from "../components/BeforeButton";
import axios from "axios";

const UserSettings: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

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

  const handleUserNameUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:7080/${phoneNumber}/name`,
        JSON.stringify(newUserName),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("이름 업데이트에 실패했습니다.");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:7080/${phoneNumber}/password`,
        newPassword
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("비밀번호 업데이트에 실패했습니다.");
    }
  };

  const handlePhoneNumberUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:7080/${phoneNumber}/phoneNumber`,
        newPhoneNumber
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("전화번호 업데이트에 실패했습니다.");
    }
  };

  const handleProfileUpdate = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("profile", profileImage);
      try {
        const response = await axios.put(
          `http://localhost:7080/${phoneNumber}/profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMessage(response.data);
      } catch (error) {
        setMessage("프로필 사진 업데이트에 실패했습니다.");
      }
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full mx-auto flex justify-between">
        <BeforeButton
          text={""}
          onClick={() => {
            navigate(`/home?userId=${username}`);
          }}
        ></BeforeButton>
        <p className="py-4 text-center text-neutral-900 text-[20px] font-semibold font-['Pretendard'] leading-snug">
          유저 설정
        </p>
        <div className="m-6"></div>
      </div>

      <div className="mb-4 flex flex-col items-center justify-center py-8">
        <img
          src={profilePicture || profile}
          alt="프로필"
          className="mb-1 w-[80px] h-[80px] rounded-full"
        />
        <p className="text-[100px] text-center text-lg  ">
          {username || "사용자 이름"}
        </p>
      </div>
      <div className="">
        <div className="flex items-center justify-center">
          <span className="ml-3 mr-1 text-center font-bold">프로필</span>
          <div className="my-2 px-4 flex items-center justify-between w-[280px] h-[40px] bg-white rounded-lg border-2 border-stone-300">
            <input
              type="file"
              className="w-40 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
              onChange={(e) =>
                e.target.files && setProfileImage(e.target.files[0])
              }
            />
            <button
              className="ml-6 font-bold text-slate-500"
              onClick={handleProfileUpdate}
            >
              수정
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <span className="ml-6 mr-1 text-center font-bold">이름</span>
          <div className="my-2 px-4 flex items-center justify-between w-[280px] h-[40px] bg-white rounded-lg border-2 border-stone-300">
            <input
              type="text"
              className="w-40 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button
              className="ml-6 font-bold text-slate-500"
              onClick={handleUserNameUpdate}
            >
              수정
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <span className="mr-1 text-center font-bold">전화번호</span>
          <div className="my-2 px-4 flex items-center justify-between w-[280px] h-[40px] bg-white rounded-lg border-2 border-stone-300">
            <input
              type="number"
              className="w-40 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
            <button
              className="ml-6 font-bold text-slate-500"
              onClick={handlePhoneNumberUpdate}
            >
              수정
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span className="mr-1 text-center font-bold">비밀번호</span>
          <div className="my-2 px-4 flex items-center justify-between w-[280px] h-[40px] bg-white rounded-lg border-2 border-stone-300">
            <input
              type="password"
              className="w-40 text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-snug"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="ml-6 font-bold text-slate-500"
              onClick={handlePasswordUpdate}
            >
              수정
            </button>
          </div>
        </div>
      </div>
      {message && <p className="mt-8 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default UserSettings;
