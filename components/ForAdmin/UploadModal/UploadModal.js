"use client"
import React, { useState } from "react";
import { storage, db } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Modal, Info } from "./UploadModal.styled";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Resizer from "react-image-file-resizer";
import "@/app/globals.css";

export const UploadModalForAdmin = ({ onClose, userId }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "JPEG",
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      if (!user) {
        console.error("Użytkownik nie jest zalogowany");
        setLoading(false);
        return;
      }

      const id = userId;

      const resizedImage = await resizeFile(file);

      const storageRef = ref(storage, `photos/${id}/${file.name}`);
      await uploadBytes(storageRef, resizedImage);

      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, `galleries/${id}/photos`), {
        url,
        description,
        timestamp: serverTimestamp(),
      });

      onClose();
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {/* {!user && (
        <Info isLoggedIn={false}>
          <h2>Aby dodać zdjęcie, musisz być zalogowany</h2>
        </Info>
      )} */}
      <h2>Dodaj nowe zdjęcie</h2>
      <input type="file" onChange={handleFileChange} />
      <textarea
        placeholder="Dodaj opis zdjęcia"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleUpload} disabled={!user || loading}>
        {loading ? "Wysyłanie..." : "Prześlij"}
      </button>
      <button onClick={onClose}>Anuluj</button>
      {loading && <p className="loading-text">Trwa wysyłanie obrazu...</p>}
    </Modal>
  );
};
