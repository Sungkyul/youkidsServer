// import React, { useEffect, useState } from "react";

// const GroupView: React.FC<{ verificationCode: string }> = ({
//   verificationCode,
// }) => {
//   const [groupedImages, setGroupedImages] = useState<Map<string, string[]>>(
//     new Map()
//   );

//   useEffect(() => {
//     const fetchImagesByGroup = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:7080/getImagesByGroup?verificationCode=${verificationCode}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setGroupedImages(new Map(Object.entries(data))); // JSON을 Map으로 변환
//         } else {
//           console.error("Failed to fetch grouped images.");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchImagesByGroup();
//   }, [verificationCode]);

//   return (
//     <div>
//       {Array.from(groupedImages.entries()).map(([groupId, images]) => (
//         <div key={groupId} className="group">
//           <h3>그룹: {groupId}</h3>
//           <div className="image-group">
//             {images.map((image, index) => (
//               <img key={index} src={image} alt={`Image ${index}`} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GroupView;
