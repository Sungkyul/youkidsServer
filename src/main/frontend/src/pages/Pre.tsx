import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIAXXNNTXWNKASLG6HO",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const rekognition = new AWS.Rekognition();

interface FaceDetail {
  Image: string;
  [key: string]: any;
}

const Pre: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [faceDetails, setFaceDetails] = useState<FaceDetail[]>([]);
  const [faceGroups, setFaceGroups] = useState<FaceDetail[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files);
      setImages(imageFiles);
    }
  };

  const detectAndGroupFaces = async () => {
    setLoading(true);
    const detectedFaces: FaceDetail[] = [];

    // Step 1: Detect Faces
    for (let image of images) {
      const imgData = await image.arrayBuffer();
      const params: AWS.Rekognition.DetectFacesRequest = {
        Image: {
          Bytes: imgData,
        },
        Attributes: ["ALL"],
      };

      try {
        const response = await rekognition.detectFaces(params).promise();
        if (response.FaceDetails && response.FaceDetails.length > 0) {
          response.FaceDetails.forEach((faceDetail) => {
            detectedFaces.push({
              ...faceDetail,
              Image: URL.createObjectURL(image),
            });
          });
        }
      } catch (error) {
        console.error("Error detecting faces: ", error);
      }
    }
    setFaceDetails(detectedFaces);

    // Step 2: Group Faces by Similarity
    const threshold = 97;
    const groups: FaceDetail[][] = [];

    for (let faceDetail of detectedFaces) {
      const img1Data = await (await fetch(faceDetail.Image)).arrayBuffer();
      let foundGroup = false;

      for (let group of groups) {
        for (let groupFaceDetail of group) {
          const img2Data = await (
            await fetch(groupFaceDetail.Image)
          ).arrayBuffer();
          const similarity = await compareFaces(img1Data, img2Data);
          if (similarity >= threshold) {
            group.push(faceDetail);
            foundGroup = true;
            break;
          }
        }
        if (foundGroup) break;
      }

      if (!foundGroup) {
        groups.push([faceDetail]);
      }
    }

    setFaceGroups(groups);
    setLoading(false);
    setShowConfirmation(true);
  };

  const compareFaces = async (
    image1Data: ArrayBuffer,
    image2Data: ArrayBuffer
  ) => {
    const params: AWS.Rekognition.CompareFacesRequest = {
      SourceImage: { Bytes: image1Data },
      TargetImage: { Bytes: image2Data },
    };

    try {
      const response = await rekognition.compareFaces(params).promise();
      if (response.FaceMatches && response.FaceMatches.length > 0) {
        return response.FaceMatches[0].Similarity!;
      }
    } catch (error) {
      console.error("Error comparing faces: ", error);
    }
    return 0;
  };

  const handleConfirm = () => {
    // Navigate to the cancel route
    navigate("/Share_Done"); // Replace with your actual route
  };

  const handleCancel = () => {
    setImages([]);
    setFaceDetails([]);
    setFaceGroups([]);
    setShowConfirmation(false);
  };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className=" text-[20px] text-center font-bold">얼굴 선택</p>
        <br></br>
      </div>
      <div className="flex">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button
          className="w-40 h-9 bg-blue-400 mr-4"
          onClick={detectAndGroupFaces}
          disabled={loading}
        >
          {loading ? "분류중..." : "분류"}
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
                {group.map((faceDetail, faceIdx) => (
                  <img
                    className="w-[40px] h-[40px] mr-1"
                    key={faceIdx}
                    src={faceDetail.Image}
                    alt={`face-${faceIdx}`}
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

export default Pre;
