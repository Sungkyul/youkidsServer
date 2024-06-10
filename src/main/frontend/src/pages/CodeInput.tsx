import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CodeInput: React.FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/photos/verify", { code });
      if (response.data.success) {
        navigate("/result", { state: { faceGroups: response.data.faceGroups } });
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className=" text-[20px] text-center font-bold">코드 입력</p>
        <br></br>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={handleCodeChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your code"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded">
          제출
        </button>
      </form>
    </div>
  );
};

export default CodeInput;
