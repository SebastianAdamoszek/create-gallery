// PhotoPublic.js
"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { PhotoPublicWrapper, ImageWrapper } from "./PhotoPublic.styled";
import AOS from "aos";
import "aos/dist/aos.css";

export const PhotoPublic = ({ url, ...props }) => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <PhotoPublicWrapper data-aos="fade-up">
      <ImageWrapper>
        <Image
          src={url}
          alt="Publiczne zdjęcie"
          layout="fill"
          objectFit="contain"
          {...props}
        />
      </ImageWrapper>
    </PhotoPublicWrapper>
  );
};
