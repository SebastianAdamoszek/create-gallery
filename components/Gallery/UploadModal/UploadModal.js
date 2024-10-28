import React, { useState } from "react";
import { storage, db } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Modal } from "./UploadModal.styled";
import { getAuth } from "firebase/auth";

export const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
       // Uzyskanie userId zalogowanego użytkownika
       const auth = getAuth();
       const user = auth.currentUser;
 
       if (!user) {
         console.error("Użytkownik nie jest zalogowany");
         return;
       }
 
       const userId = user.uid;

      // Tworzenie referencji do pliku w Storage
      const storageRef = ref(storage, `photos/${userId}/${file.name}`);

      // Przesyłanie pliku do Storage
      await uploadBytes(storageRef, file);

      // Pobieranie URL-a pliku
      const url = await getDownloadURL(storageRef);

        // Dodanie wpisu do kolekcji użytkownika w Firestore
      await addDoc(collection(db, `galleries/${userId}/photos`), {
        url,
        timestamp: serverTimestamp(),
      });

      onClose(); // zamknij modal po przesłaniu
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
    }
  };

  return (
    <Modal>
      <h2>Dodaj nowe zdjęcie</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Prześlij</button>
      <button onClick={onClose}>Anuluj</button>
    </Modal>
  );
};
