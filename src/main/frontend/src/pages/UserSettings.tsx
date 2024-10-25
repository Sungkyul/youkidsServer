import React, { useEffect, useState } from "react";
import axios from "axios";

const UserSettings: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
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
        setPhoneNumber(response.data.phoneNumber);
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
    <div className="settings-container">
      <h2>유저 정보 수정</h2>
      <div>
        <label>이름:</label>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleUserNameUpdate}>이름 수정</button>
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordUpdate}>비밀번호 수정</button>
      </div>
      <div>
        <label>전화번호:</label>
        <input
          type="text"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
        <button onClick={handlePhoneNumberUpdate}>전화번호 수정</button>
      </div>
      <div>
        <label>프로필 사진:</label>
        <input
          type="file"
          onChange={(e) => e.target.files && setProfileImage(e.target.files[0])}
        />
        <button onClick={handleProfileUpdate}>프로필 사진 수정</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserSettings;
