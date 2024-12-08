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
  // Zmieniamy domyślny motyw na 'light-teal'
  const [theme, setTheme] = useState("light-teal");

  // Funkcja do zapamiętania wybranego motywu w localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light-teal";  // Ustawienie domyślnego motywu na 'light-teal'
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

