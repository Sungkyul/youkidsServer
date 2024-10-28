import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeforeButton from "../components/BeforeButton";
import axios from "axios";

const CustomerService: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7080/dashboard", {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 제출 로직 추가 (예: API 호출)
    console.log("제목:", title);
    console.log("내용:", content);
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
          고객센터
        </p>
        <div className="m-6"></div>
      </div>

      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[300px] mx-6 mt-8 space-y-4 items-between"
        >
          <div>
            <label htmlFor="title" className="mr-1 text-center font-bold">
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="제목을 입력하세요."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="content" className="mr-1 text-center font-bold">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              placeholder="내용을 입력하세요."
              className="mt-1 block w-full h-[200px] border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="flex mt-2 items-center justify-center w-72 h-[50px] bg-emerald-200 rounded-lg"
              onClick={() => {
                navigate(`/home?userId=${username}`);
              }}
            >
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerService;
