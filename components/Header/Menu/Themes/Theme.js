"use client";
import { useState, useEffect } from "react";
import {
  BtnWhite,
  BtnLightTeal,
  BtnOrange,
  BtnHoney,
  ThemeContainer,
} from "./Theme.styled";
export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("honey");

  // Funkcja do zapamiętania wybranego motywu w localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "honey";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Zmieniamy motyw i zapisujemy go w localStorage
  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  return (
    <ThemeContainer>
      <BtnWhite onClick={() => changeTheme("white")} aria-label="zmień kolor tekstu"></BtnWhite>
      <BtnLightTeal onClick={() => changeTheme("light-teal")} aria-label="zmień kolor tekstu"></BtnLightTeal>
      <BtnOrange onClick={() => changeTheme("orange")} aria-label="zmień kolor tekstu"></BtnOrange>
      <BtnHoney onClick={() => changeTheme("honey")} aria-label="zmień kolor tekstu"></BtnHoney>
    </ThemeContainer>
  );
};
