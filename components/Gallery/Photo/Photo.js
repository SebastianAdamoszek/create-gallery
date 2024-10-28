"use client";
import React from "react";
import Image from "next/image";
import { PhotoContainer } from "./Photo.styled";

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
