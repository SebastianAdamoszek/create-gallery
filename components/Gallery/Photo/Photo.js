"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PhotoContainer,
  PhotoDelWrapper,
  RemoveIcon,
  CheckBox,
  CheckIcon,
} from "./Photo.styled";
import { FaTrash, FaCheck } from "react-icons/fa";
import { ref, deleteObject } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "@/firebase/firebase";
import AOS from "aos";
import "aos/dist/aos.css";



export const Photo = ({ url }) => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <PhotoContainer data-aos="fade-up">
      <Image
        src={url}
        alt="Przesłane zdjęcie"
        layout="fill"
        objectFit="contain"
      />
    </PhotoContainer>
  );
};

export const PhotoForDel = ({ url, refreshGallery }) => {
  const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);
  const [user] = useAuthState(auth);

  const handleDeleteClick = () => {
    setIsMarkedForDeletion(!isMarkedForDeletion);
  };

  const confirmDeletion = async () => {
    if (!url || typeof url !== "string") {
      console.error("Niepoprawny URL zdjęcia:", url);
      return;
    }

    try {
      if (!user) {
        console.error("Użytkownik nie jest zalogowany");
        return;
      }

      const userId = user.uid;

      // Uzyskanie nazwy pliku
      const fileName = url.split('/').pop().split('?')[0];
      const decodedFileName = decodeURIComponent(fileName); // Dekodujemy nazwę pliku
      console.log("Nazwa pliku do usunięcia:", fileName);
      console.log("Dekodowana nazwa pliku do usunięcia:", decodedFileName);

      // Usunięcie dokumentu z Firestore na podstawie URL-a
      const photosRef = collection(db, `galleries/${userId}/photos`);
      const q = query(photosRef, where("url", "==", url));
      const querySnapshot = await getDocs(q);

      // Usuwanie każdego dokumentu znalezionego w zapytaniu
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref); // Usunięcie dokumentu z Firestore
        console.log("Zdjęcie usunięte z Firestore");

        // Następnie usuwamy plik ze Storage
        const storageRef = ref(storage, `${decodedFileName}`);
        console.log("Usuwana ścieżka:", storageRef.fullPath); // Logowanie ścieżki
        await deleteObject(storageRef);
        console.log("Zdjęcie usunięte ze Storage");
      }

      // Odświeżenie galerii po usunięciu
      refreshGallery();
    } catch (error) {
      console.error("Błąd podczas usuwania zdjęcia:", error);
    }
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
      />
      <CheckIcon isChecked={isMarkedForDeletion}>
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
