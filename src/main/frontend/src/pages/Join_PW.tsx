import React from "react";
import { useNavigate } from "react-router-dom";
function Join_PW() {
  // const [password, setPassword] = useState("");

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleSubmit = () => {
  //   // 비밀번호를 서버로 전송
  //   fetch("/password", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ password }),
  //   })
  //     .then((response) => {
  //       // 서버의 응답을 처리
  //       if (response.ok) {
  //         // 성공적으로 처리됨
  //         console.log("비밀번호가 서버로 전송되었습니다.");
  //       } else {
  //         // 실패한 경우
  //         console.error("서버에 문제가 발생했습니다.");
  //       }
  //     })
  //     .catch((error) => {
  //       // 네트워크 오류 등 예외 처리
  //       console.error("요청을 보내는 중 오류가 발생했습니다.", error);
  //     });
  // };
  const navigate = useNavigate();

  const handleConfirmation = () => {
    // '확인' 버튼을 클릭하면 Join_Name로 이동
    navigate("/Join_Name");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-emerald-200">
      <div className="mb-16">
        <div>
          <span className="text-slate-500 text-[26px] font-bold font-['Pretendard'] leading-snug">
            새로운 비밀번호
          </span>
          <span className="text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
            를<br />
            입력해 주세요.
          </span>
        </div>
        <div className="my-4 flex items-center justify-start w-72 h-[50px] bg-white rounded-lg border-2 border-stone-300">
          <input
            type="password"
            className="mx-2 w-full h-full text-neutral-900 text-sm font-normal font-['Pretendard'] leading-snug"
            placeholder="비밀번호를 입력하세요."
            // value={password}
            // onChange={handlePasswordChange}
          />
        </div>
        <button
          onClick={handleConfirmation}
          className="flex items-center justify-center w-72 h-[50px] bg-slate-500 rounded-lg"
          // onClick={handleSubmit}
        >
          <div className="text-center text-white text-base font-normal font-['Pretendard'] leading-snug">
            확인
          </div>
        </button>
      </div>
    </div>
  );
}

export default Join_PW;
