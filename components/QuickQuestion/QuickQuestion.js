"use client";
import React, { useState, useEffect } from "react";
import { storage, db } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Modal, Info, InputContainer } from "./QuickQuestion.styled";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Resizer from "react-image-file-resizer";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState(""); // Stan dla numeru telefonu
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
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
    // Walidacja numeru telefonu
    const phoneRegex = /^[0-9]{9}$/; // Sprawdza, czy numer ma dokładnie 9 cyfr
    if (!phoneRegex.test(phone.trim())) {
      alert("Proszę podać prawidłowy numer telefonu (9 cyfr bez spacji).");
      return;
    }

    if (!file) {
      alert("Proszę wybrać plik do przesłania.");
      return;
    }

    setLoading(true);

    try {
      const userId = user ? user.uid : "guest";
      const resizedImage = await resizeFile(file);

      const storageRef = ref(
        storage,
        user ? `photos/${userId}/${file.name}` : `guest_photos/${file.name}`
      );

      await uploadBytes(storageRef, resizedImage);

      const url = await getDownloadURL(storageRef);

      if (user) {
        await addDoc(collection(db, `galleries/photos/${userId}`), {
          url,
          description,
          phone, // Zapis numeru telefonu
          timestamp: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "guestUploads"), {
          url,
          description,
          phone, // Zapis numeru telefonu
          timestamp: serverTimestamp(),
        });
      }

      alert(
        "Zdjęcie zostało wysłane! Dziękujemy za przesłanie. Zachęcamy do założenia konta, aby mieć stały dostęp do swoich zdjęć. Oczekuj na kontakt serwisanta."
      );
      router.push("/welcome");
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <Modal>
      <h2 data-aos="fade-up" >Dodaj zdjęcie</h2>
      <InputContainer data-aos="fade-up" >
        <input type="file" onChange={handleFileChange} />
        <textarea
          style={{ padding: "5px", borderRadius: "5px" }}
          placeholder="Dodaj opis, napisz zapytanie"
          value={description}
          onChange={handleDescriptionChange}
        />
        <input
          style={{ padding: "5px", borderRadius: "5px" }}
          type="tel"
          placeholder="123456789 - nr kontaktowy"
          value={phone}
          onChange={handlePhoneChange}
        />
      </InputContainer>

      <button data-aos="fade-up"  onClick={handleUpload} disabled={loading}>
        {loading ? "Wysyłanie..." : "Prześlij"}
      </button>
      <button data-aos="fade-up" 
        onClick={() => {
          router.push("/welcome");
        }}
      >
        Anuluj
      </button>
      {loading && <p className="loading-text">Trwa wysyłanie obrazu...</p>}
      {!user && (
        <Info data-aos="fade-up" >
          Jesteś gościem. Twoje zdjęcie zostanie przesłane bez powiązania z
          kontem użytkownika.
        </Info>
      )}
    </Modal>
  );
};
