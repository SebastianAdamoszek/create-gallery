"use client";
import { useState } from "react";
import { Icon } from "./NotLoggedIn.styled";
import { AuthForm } from "@/components/AuthForm/AuthForm";

export const NotLoggedIn = () => {
  const [isAuthFormVisible, setIsAuthFormVisible] = useState(true);
  const [zoomOut, setZoomOut] = useState(true);

  // Funkcja pokazująca formularz i ustawiająca zoomOut na false
  const showAuthForm = () => {
    setIsAuthFormVisible(true);
    setZoomOut(false); // Resetujemy zoomOut przy każdym kliknięciu
  };

  // Funkcja minimalizująca formularz
  const toggleZoomOut = () => {
    setZoomOut((prevZoomOut) => !prevZoomOut); // Przełączanie zoomOut
  };

  return (
    <>
      {isAuthFormVisible && (
        <AuthForm zoomOut={zoomOut} toggleZoomOut={toggleZoomOut} />
      )}

      <Icon onClick={showAuthForm} title="Nie jesteś zalogowany">
        😴
        <p>Log in</p>

      </Icon>
    </>
  );
};
