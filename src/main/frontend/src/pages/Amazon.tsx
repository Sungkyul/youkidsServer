import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AWS from "aws-sdk";
import ShareLoading from "./Share_Loading";

// AWS 설정
AWS.config.update({
  accessKeyId: "a",
  secretAccessKey: "s",
  region: "ap-northeast-2",
});

const rekognition = new AWS.Rekognition();

interface FaceDetail {
  imagePath: string;
  faceDetail: AWS.Rekognition.FaceDetail;
}

const Amazon: React.FC = () => {
  const location = useLocation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [detectedFaces, setDetectedFaces] = useState<FaceDetail[]>([]);
  const [faceGroups, setFaceGroups] = useState<FaceDetail[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.state?.selectedFiles) {
      setSelectedFiles(location.state.selectedFiles);
      handleProcess(location.state.selectedFiles);
    }
  }, [location.state]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
      handleProcess(files); // 파일이 선택될 때마다 처리
    }
  };

  const detectAndSaveFaces = async (files: File[]): Promise<FaceDetail[]> => {
    const faces: FaceDetail[] = [];

    for (const file of files) {
      const imageBytes = await file.arrayBuffer();

      console.log("File:", file);
      console.log("Image Bytes:", new Uint8Array(imageBytes));

      const params = {
        Image: { Bytes: new Uint8Array(imageBytes) },
        Attributes: ["ALL"],
      };

      const response = await rekognition.detectFaces(params).promise();
      const image = URL.createObjectURL(file);
      const img = new Image();
      img.src = image;

      await new Promise((resolve) => {
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          response.FaceDetails?.forEach((faceDetail) => {
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
    };

    const response = await rekognition.compareFaces(params).promise();
    return response.FaceMatches?.[0]?.Similarity || 0;
  };

  const groupFacesBySimilarity = async (
    faces: FaceDetail[],
    threshold: number = 90 // 임계값
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

  const handleProcess = async (files: File[]) => {
    setIsProcessing(true);
    const faces = await detectAndSaveFaces(files);
    setDetectedFaces(faces);
    await groupFacesBySimilarity(faces);
    setIsProcessing(false);
    setShowConfirmation(true);
  };

  const handleSendToBackend = async () => {
    const formData = new FormData();
    const groupData: { [key: number]: string[] } = {}; // 그룹 ID를 숫자로 변경

    // 비동기적으로 모든 파일을 formData에 추가
    await Promise.all(
      faceGroups.flatMap((group, idx) =>
        group.map((face, faceIdx) =>
          fetch(face.imagePath)
            .then((res) => res.blob())
            .then((blob) => {
              const fileName = `group_${idx}_face_${faceIdx}.jpg`;
              formData.append(`files`, blob, fileName);

              // 그룹 정보를 저장할 때 숫자로 처리
              if (!groupData[idx]) {
                groupData[idx] = [];
              }
              groupData[idx].push(fileName);
            })
        )
      )
    );

    // 그룹 정보를 FormData에 추가
    formData.append("groupData", JSON.stringify(groupData));

    try {
      const response = await fetch("http://localhost:7080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        const backendCode = data;
        navigate("/Share_Done", { state: { verificationCode: backendCode } });
        console.log("Received verification code:", data);
      } else {
        const errorText = await response.text(); // 서버에서 반환한 에러 메시지
        console.error("Failed to send data to the backend:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConfirm = async () => {
    await handleSendToBackend();
  };

  const handleCancel = () => {
    navigate("/home"); // 홈 화면으로 이동
  };

  if (isProcessing) {
    return <ShareLoading />;
  }

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className="text-center text-neutral-900 text-[22px] font-semibold font-['Pretendard'] leading-snug">
          사진 공유
        </p>
      </div>

      <div className="pt-2">
        {faceGroups.map((group, idx) => (
          <div
            key={idx}
            className="mx-[14px] my-[14px] rounded-lg flex items-center bg-neutral-100"
          >
            <div className="items-center h-[108px]">
              <div className="ml-4 mt-2 pb-2 font-medium">
                <p>인물 {idx + 1}</p>
              </div>
              <div className="mx-[14px] my-[14px] flex items-center justify-between">
                <div className="flex items-center overflow-x-auto max-w-80">
                  {group.map((face, faceIdx) => (
                    <img
                      key={faceIdx}
                      src={face.imagePath}
                      alt={`Face ${faceIdx + 1}`}
                      className="w-11 h-11 mr-1 rounded-[0px]"
                    />
                  ))}
                </div>
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
