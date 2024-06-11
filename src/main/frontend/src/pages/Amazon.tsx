import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";

// AWS 설정
AWS.config.update({
  accessKeyId: "AKIAXXNNTXWNKASLG6HO",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const rekognition = new AWS.Rekognition();

interface FaceDetail {
  imagePath: string;
  faceDetail: AWS.Rekognition.FaceDetail;
}

const Amazon: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [detectedFaces, setDetectedFaces] = useState<FaceDetail[]>([]);
  const [faceGroups, setFaceGroups] = useState<FaceDetail[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 참조 추가

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const detectAndSaveFaces = async (files: File[]): Promise<FaceDetail[]> => {
    const faces: FaceDetail[] = [];

    for (const file of files) {
      const imageBytes = await file.arrayBuffer();
      const params = {
        Image: { Bytes: new Uint8Array(imageBytes) },
        Attributes: ["ALL"], // Attributes는 "ALL" 또는 "DEFAULT"로 설정
      };

      try {
        const response = await rekognition.detectFaces(params).promise();
        const image = URL.createObjectURL(file);
        const img = new Image();
        img.src = image;

        await new Promise((resolve) => {
          img.onload = () => {
            const width = img.width;
            const height = img.height;

            response.FaceDetails?.forEach((faceDetail, index) => {
              const box = faceDetail.BoundingBox!;
              const left = Math.floor(box.Left! * width);
              const top = Math.floor(box.Top! * height);
              const right = Math.floor((box.Left! + box.Width!) * width);
              const bottom = Math.floor((box.Top! + box.Height!) * height);

              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d")!;
              canvas.width = right - left;
              canvas.height = bottom - top;
              ctx.drawImage(
                img,
                left,
                top,
                canvas.width,
                canvas.height,
                0,
                0,
                canvas.width,
                canvas.height
              );

              canvas.toBlob((blob) => {
                const newImagePath = URL.createObjectURL(blob!);
                faces.push({ imagePath: newImagePath, faceDetail });
              });
            });
            resolve(null);
          };
        });
      } catch (error) {
        console.error("Error detecting faces:", error);
      }
    }

    return faces;
  };

  const compareFaces = async (
    face1: FaceDetail,
    face2: FaceDetail
  ): Promise<number> => {
    const img1 = await fetch(face1.imagePath).then((res) => res.blob());
    const img2 = await fetch(face2.imagePath).then((res) => res.blob());

    const params = {
      SourceImage: { Bytes: await img1.arrayBuffer() },
      TargetImage: { Bytes: await img2.arrayBuffer() },
      SimilarityThreshold: 90, // 유사도 임계값 설정 (기본값은 80)
    };

    try {
      const response = await rekognition.compareFaces(params).promise();
      return response.FaceMatches?.[0]?.Similarity || 0;
    } catch (error) {
      console.error("Error comparing faces:", error);
      return 0;
    }
  };

  const groupFacesBySimilarity = async (
    faces: FaceDetail[],
    threshold: number = 90
  ) => {
    const groups: FaceDetail[][] = [];

    for (const face1 of faces) {
      let foundGroup = false;
      for (const group of groups) {
        for (const face2 of group) {
          const similarity = await compareFaces(face1, face2);
          if (similarity >= threshold) {
            group.push(face1);
            foundGroup = true;
            break;
          }
        }
        if (foundGroup) break;
      }
      if (!foundGroup) groups.push([face1]);
    }
    setFaceGroups(groups);
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    const faces = await detectAndSaveFaces(selectedFiles);
    setDetectedFaces(faces);
    await groupFacesBySimilarity(faces);
    setIsProcessing(false);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    navigate("/Share_Done");
  };

  const handleCancel = () => {
    setSelectedFiles([]);
    setDetectedFaces([]);
    setFaceGroups([]);
    setShowConfirmation(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className=" text-[20px] text-center font-bold">사진 선택</p>
        <br></br>
      </div>
      <div className="flex">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <button
          className="w-40 h-9 bg-blue-400 mr-4"
          onClick={handleProcess}
          disabled={isProcessing}
        >
          {isProcessing ? "분류 중..." : "분류"}
        </button>
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
      {showConfirmation && (
        <div className="flex justify-between mx-[24px]">
          <button
            className="w-36 h-9 bg-emerald-200 rounded-lg shadow"
            onClick={handleConfirm}
          >
            <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              확인
            </div>
          </button>
          <button
            className="w-36 h-9 bg-emerald-200 rounded-lg shadow"
            onClick={handleCancel}
          >
            <div className="text-center text-neutral-900 text-base font-semibold font-['Pretendard'] leading-snug">
              취소
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Amazon;
