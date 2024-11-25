import React, { useEffect, useState } from "react";
import { RingLoader, CircleLoader, ClockLoader, BarLoader } from "react-spinners";
// https://www.davidhu.io/react-spinners/
import "@/app/globals.css";

export const Loader = () => {
  const [colorTheme, setColorTheme] = useState("");

  useEffect(() => {
    // Pobieramy wartość zmiennej CSS
    const rootStyle = getComputedStyle(document.documentElement);
    const foregroundRgb = rootStyle.getPropertyValue("--foreground-rgb").trim();
    setColorTheme(`rgb(${foregroundRgb})`);
  }, []);

  return (
    <div style={loaderStyle}>
      <div style={clockStyle} className="loader">
        <ClockLoader size={150} color={colorTheme} loading={true} />
      </div>
      <p color={colorTheme}>Loading...</p>
    </div>
  );
};

const loaderStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
};
const clockStyle = {
  transform: "rotate(-90deg)",
};



export const LoaderBar = () => {
  const [colorTheme, setColorTheme] = useState("");

  useEffect(() => {
    // Pobieramy wartość zmiennej CSS
    const rootStyle = getComputedStyle(document.documentElement);
    const foregroundRgb = rootStyle.getPropertyValue("--foreground-rgb").trim();
    setColorTheme(`rgb(${foregroundRgb})`);
  }, []);

  return <BarLoader color={colorTheme || "#000"} width={100}/>;
};

export const StartLoader = () => {
  const [colorTheme, setColorTheme] = useState("");

  useEffect(() => {
    // Pobieramy wartość zmiennej CSS
    const rootStyle = getComputedStyle(document.documentElement);
    const foregroundRgb = rootStyle.getPropertyValue("--foreground-rgb").trim();
    setColorTheme(`rgb(${foregroundRgb})`);
  }, []);

  return (
    <div style={loaderStyle}>
      <div style={clockStyle} className="loader">
        <ClockLoader size={150} color="#be9656" loading={true} />
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

// const loaderStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "50vh",
// };
// const clockStyle = {
//   transform: "rotate(-90deg)",
// };