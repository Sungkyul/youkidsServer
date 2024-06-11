import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { faceGroups } = location.state as { faceGroups: any[][] };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className=" text-[20px] text-center font-bold">분류 결과</p>
        <br></br>
      </div>
      <div>
        {faceGroups.map((group, idx) => (
          <div
            key={idx}
            className="ml-4 mb-4 w-[332px] h-[100px] bg-neutral-100 rounded-lg"
          >
            <div className="mb-4">
              <p className="ml-2 text-left font-bold">인물 {idx + 1}</p>
              <br />
              <div className="ml-2 flex flex-wrap">
                {group.map((face, faceIdx) => (
                  <img
                    className="w-[40px] h-[40px] mr-1"
                    key={faceIdx}
                    src={face.imagePath}
                    alt={`Face ${faceIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
