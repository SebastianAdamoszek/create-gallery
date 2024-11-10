"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PhotoContainer,
  Description,
  ButtonSaveDesc,
  PhotoDelWrapper,
  ImageWrapper,
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
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "@/firebase/firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loader } from "@/components/Loader/Loader";

export const Photo = ({ url, userId, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const saveDescription = async () => {
    setSaving(true);
    try {
      const photosRef = doc(db, `galleries/${userId}/photos`, url);
      await updateDoc(photosRef, {
        description: description,
      });
      console.log("Opis zapisany!");
    } catch (error) {
      console.error("Błąd podczas zapisywania opisu:", error);
    }
    setSaving(false);
  };

  return (
    <PhotoContainer data-aos="fade-up">
      {!loaded && <Loader>Pobieranie</Loader>}
      <ImageWrapper>
        <Image
          src={url}
          alt="Przesłane zdjęcie"
          onLoad={handleImageLoad}
          layout="fill"
          objectFit="contain"
          {...props}
        />
      </ImageWrapper>

      <Description
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Wpisz opis zdjęcia"
      />
      <ButtonSaveDesc onClick={saveDescription} disabled={saving}>
        {saving ? "Zapisuję..." : "Zapisz opis"}
      </ButtonSaveDesc>
    </PhotoContainer>
  );
};

export const PhotoForDel = ({ url, refreshGallery = () => {}, userId }) => {
  const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);

  const handleDeleteClick = () => {
    setIsMarkedForDeletion(!isMarkedForDeletion);
  };

  const confirmDeletion = async () => {
    if (!url || typeof url !== "string") {
      console.error("Niepoprawny URL zdjęcia:", url);
      return;
    }

    try {
      // Użycie przekazanego userId do ścieżki galerii
      const fileName = url.split("/").pop().split("?")[0];
      const decodedFileName = decodeURIComponent(fileName); // Dekodowanie nazwy pliku
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
        const storageRef = ref(storage, decodedFileName);
        console.log("Usuwana ścieżka:", storageRef.fullPath); // Logowanie ścieżki
        await deleteObject(storageRef);
        console.log("Zdjęcie usunięte ze Storage");
      }

      // Zresetowanie stanu zaznaczenia do usunięcia
      setIsMarkedForDeletion(false);

      // Wywołanie funkcji odświeżania galerii po usunięciu
      if (typeof refreshGallery === "function") {
        refreshGallery();
      } else {
        console.warn("refreshGallery nie jest funkcją");
      }
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
