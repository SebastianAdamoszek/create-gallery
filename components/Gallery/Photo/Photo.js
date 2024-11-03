"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  PhotoContainer,
  PhotoDelWrapper,
  RemoveIcon,
  CheckBox,
  CheckIcon,
} from "./Photo.styled";
import { FaTrash, FaCheck } from "react-icons/fa";

export const Photo = ({ url }) => {
  return (
    <PhotoContainer>
      <Image
        src={url}
        alt="Przesłane zdjęcie"
        // width={100}
        // height={100}
        // sizes="(max-width: 480px) 320px,
        // (max-width: 768px) 768px,
        // (max-width: 1024px) 1024px,
        // 1920px"
        // layout="responsive"
        layout="fill"
        objectFit="contain"
      />
    </PhotoContainer>
  );
};

export const PhotoForDel = ({ url }) => {
  const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);

  const handleDeleteClick = () => {
    setIsMarkedForDeletion(!isMarkedForDeletion);
  };

  const confirmDeletion = () => {
    console.log("Zdjęcie zostało usunięte!");
    // Tutaj dodaj logikę usuwania zdjęcia z galerii
  };

  return (
    <PhotoDelWrapper isMarked={isMarkedForDeletion}>
      <Image
        width={100}
        height={100}
        src={url}
        alt="Opis zdjęcia"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <RemoveIcon isMarked={isMarkedForDeletion} onClick={confirmDeletion}>
        <FaTrash />
      </RemoveIcon>
      <CheckBox
        type="checkbox"
        checked={isMarkedForDeletion}
        onChange={handleDeleteClick}
      ></CheckBox>
      <CheckIcon  isChecked={isMarkedForDeletion}>
        <FaCheck />
      </CheckIcon>
    </PhotoDelWrapper>
  );
};

//import Imgix from "react-imgix";

// export const Photo = ({ url }) => {
//   return (
//     <Image
//       width={100}
//       height={100}
//       src={url}
//       imgixParams={{
//         fit: "crop",
//         ar: "1:1",
//         auto: "format,compress",
//         q: 75,
//         sepia: 15,
//         blur: 5,
//         sat: 20,
//       }}
//       sizes="(max-width: 800px) 100vw, 800px"
//       alt="Opis zdjęcia"
//       style={{
//         borderRadius: "12px",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//         margin: "10px",
//       }}
//     />
//   );
// };
