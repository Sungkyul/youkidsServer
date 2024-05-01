import React, { useState } from "react";
import AWS from "aws-sdk";
import NextButton from "../components/NextButton";

const awsConfig = {
  accessKeyId: "AKIAXXNNTXWNKASLG6HO",
  secretAccessKey: "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",
  region: "ap-northeast-2",
};

AWS.config.update(awsConfig);

const rekognition = new AWS.Rekognition();

const Amazon: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [faceGroups, setFaceGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files);
      setUploadedImages(imagesArray);
    }
  };

  const recognizeFaces = async () => {
    setLoading(true);
    const faceGroupsArray: any[] = [];
    for (const image of uploadedImages) {
      const imageParams = {
        Image: {
          Bytes: await image.arrayBuffer(),
        },
      };
      try {
        const data = await rekognition.detectFaces(imageParams).promise();
        if (data.FaceDetails) {
          const faceDetails = data.FaceDetails;
          for (const faceDetail of faceDetails) {
            let foundGroup = false;
            for (const group of faceGroupsArray) {
              if (group.faceDetails.length > 0) {
                const similarity = await compareFaces(
                  image,
                  faceDetail,
                  group.image,
                  group.faceDetails[0]
                );
                if (similarity && similarity > 0.9) {
                  group.faceDetails.push(faceDetail);
                  foundGroup = true;
                  break;
                }
              }
            }
            if (!foundGroup) {
              faceGroupsArray.push({
                faceDetails: [faceDetail],
                image: image,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error detecting faces:", error);
      }
    }
    setFaceGroups(faceGroupsArray);
    setLoading(false);
  };

  const compareFaces = async (
    image1: File,
    faceDetail1: any,
    image2: File,
    faceDetail2: any
  ) => {
    const params = {
      SimilarityThreshold: 90,
      SourceImage: {
        Bytes: await image1.arrayBuffer(),
      },
      TargetImage: {
        Bytes: await image2.arrayBuffer(),
      },
    };
    const result = await rekognition.compareFaces(params).promise();
    if (result.FaceMatches && result.FaceMatches.length > 0) {
      return result.FaceMatches[0].Similarity;
    }
    return 0;
  };

  return (
    <div className="w-full mx-auto">
      <div className="justify-center py-4">
        <p className=" text-[20px] text-center font-bold">얼굴 선택</p>
        <br></br>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      <button
        className="w-20 h-9 bg-blue-400"
        onClick={recognizeFaces}
        disabled={loading || uploadedImages.length === 0}
      >
        {loading ? "분류중..." : "분류"}
      </button>
      <div>
        <br></br>
      </div>

      {faceGroups.map((group, index) => (
        <div className="ml-4 mb-4 w-[332px] h-[100px] bg-neutral-100 rounded-lg">
          <div key={index} className="mb-4">
            <p className="ml-2 text-left font-bold ">인물 {index + 1}</p>
            <br></br>
            <div className="ml-2 flex flex-wrap">
              {group.faceDetails.map((faceDetail: any, i: number) => (
                <div key={i} className="flex items-center mr-2">
                  <img
                    className="w-[40px] h-[40px]"
                    src={URL.createObjectURL(group.image)}
                    alt={`Face ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amazon;
