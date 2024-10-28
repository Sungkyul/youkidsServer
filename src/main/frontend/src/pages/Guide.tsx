import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeforeButton from "../components/BeforeButton";
import axios from "axios";

const Guide: React.FC = () => {
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
          이용 안내
        </p>
        <div className="m-6"></div>
      </div>

      <div className="pt-8 mx-6">
        <p className="mb-4 text-neutral-900 font-normal font-['Pretendard'] leading-snug">
          저희 유퀴즈는 AI를 이용한 얼굴 분류 서비스를 제공합니다.
          <br />
          아래는 서비스 이용에 대한 주요 사항입니다:
        </p>
        <p className="font-bold">사진 공유</p>
        <p className="text-neutral-900 font-normal font-['Pretendard'] leading-snug">
          1. 업로드할 파일을 선택합니다.
          <br />
          2. AI를 통해 얼굴별로 분류한 사진이 보입니다.
          <br />
          3. 분류가 제대로 되었다면 확인 버튼을 클릭합니다.
          <br />
          4. 생성된 코드를 확인합니다.
        </p>
        <br />
        <p className="font-bold">앨범 생성</p>
        <p className="text-neutral-900 font-normal font-['Pretendard'] leading-snug">
          1. 코드를 입력합니다.
          <br />
          2. 얼굴별로 분류된 사진이 화면에 나타납니다.
          <br />
          3. 본인의 얼굴을 선택합니다.
          <br />
          4. 생성 버튼을 클립합니다.
          <br />
          5. 제목을 입력하고 저장 버튼을 클릭합니다.
        </p>

        <p className="pt-4">
          이용하시면서 궁금한 점이 있으시면 언제든지 문의해 주세요. 감사합니다!
        </p>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="flex mt-2 items-center justify-center w-72 h-[50px] bg-emerald-200 rounded-lg"
            onClick={() => {
              navigate(`/home?userId=${username}`);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
