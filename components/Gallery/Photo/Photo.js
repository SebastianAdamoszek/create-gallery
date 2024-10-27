"use client"
import React from "react";
import Image from "next/image";

export const Photo = ({ url }) => {
  return (
    <div className="photo">
        <Image src={url} alt="Przesłane zdjęcie" width={300} height={150} />
  </div>
  );
};


