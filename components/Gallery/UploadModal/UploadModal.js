import React, { useState } from "react";
import { storage, db } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Modal, ButtonToLogin, Info, Input, ButtonModal } from "./UploadModal.styled";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Resizer from "react-image-file-resizer";
import Link from "next/link";
import "@/app/globals.css";

export const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Stan dla procesu ładowania
  const [user] = useAuthState(auth);
  const [description, setDescription] = useState("");

  // Funkcja zmiany pliku
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
        800, // szerokość docelowa w pikselach
        800, // wysokość docelowa w pikselach
        "JPEG", // format pliku
        70, // jakość obrazu w procentach (0-100)
        0, // rotacja w stopniach
        (uri) => {
          resolve(uri);
        },
        "blob" // typ wyjścia - blob jest wymagany przez Firebase Storage
      );
    });

  // Funkcja do wysyłania obrazu
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true); // Ustawiamy loading na true, aby pokazać status

    try {
      // Jeśli użytkownik nie jest zalogowany, nie pozwalamy na wysyłanie
      if (!user) {
        console.error("Użytkownik nie jest zalogowany");
        setLoading(false);
        return;
      }

      const userId = user.uid;

      // Przeskalowanie obrazu przed wysłaniem
      const resizedImage = await resizeFile(file);

      // Tworzenie referencji do pliku w Storage
      const storageRef = ref(storage, `photos/${userId}/${file.name}`);

      // Przesyłanie obrazu do Firebase Storage
      await uploadBytes(storageRef, resizedImage);

      // Pobieranie URL-a pliku
      const url = await getDownloadURL(storageRef);

      // Dodanie URL-a do Firestore
      await addDoc(collection(db, `galleries/${userId}/photos`), {
        url,
        description,
        timestamp: serverTimestamp(),
      });

      // Zamknięcie modala po wysłaniu
      alert(
        "Zdjęcie zostało wysłane! Dodaj opis lub zapytanie! Dziękujemy! Oczekuj na kontakt serwisanta."
      );
      onClose();
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
    } finally {
      setLoading(false); // Po zakończeniu procesu ustawiamy loading na false
    }
  };

  return (
    <Modal>
      {!user && (
        <Info isLoggedIn={false}>
          <h2>Jesteś w {'"My Gallery"'}</h2>
          <h2>Aby dodać tu zdjęcie musisz być zalogowany</h2>
          <Link href="/login-register">
            <ButtonToLogin>Przejdź do logowania</ButtonToLogin>
          </Link>
        </Info>
      )}
      <h2>Dodaj nowe zdjęcie</h2>
      <Input type="file" onChange={handleFileChange} />
      <div>
        <textarea
          style={{ display: "none" }}
          placeholder="Dodaj opis zdjęcia"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <ButtonModal onClick={handleUpload} disabled={!user || loading}>
        {loading ? "Wysyłanie..." : "Prześlij"}
      </ButtonModal>
      <ButtonModal onClick={onClose}>Anuluj</ButtonModal>
      {loading && <p className="loading-text">Trwa wysyłanie obrazu...</p>}
    </Modal>
  );
};
