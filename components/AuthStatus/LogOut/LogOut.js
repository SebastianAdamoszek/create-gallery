"use client";
import { useState } from "react";
import { IconContainer, Icon } from "./LogOut.styled";
import { AuthForm } from "@/components/AuthForm/AuthForm";

export const LogOut = () => {
  const [isAuthFormVisible, setIsAuthFormVisible] = useState(true);
  const [zoomOut, setZoomOut] = useState(false);

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
      <IconContainer>
        {isAuthFormVisible && (
          <AuthForm zoomOut={zoomOut} toggleZoomOut={toggleZoomOut} />
        )}
      </IconContainer>
      <Icon onClick={showAuthForm} title="Nie jesteś zalogowany">
        😴
      </Icon>
    </>
  );
};
