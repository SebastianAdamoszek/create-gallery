import React, { useEffect, useState } from "react";
import {
  RingLoader,
  CircleLoader,
  ClockLoader,
  BarLoader,
} from "react-spinners";
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
      <div style={textStyle}>
        <p color={colorTheme}>Loading...</p>
      </div>
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
  backgroundColor: "rgba(0,0,0,0.7)",
  borderRadius: "25px",
  padding: "10px",
};
const textStyle = {
  backgroundColor: "rgba(0,0,0,0.7)",
  width: "300px",
  padding: "10px",
  textAlign: "center",
};

export const LoaderBar = () => {
  const [colorTheme, setColorTheme] = useState("");

  useEffect(() => {
    // Pobieramy wartość zmiennej CSS
    const rootStyle = getComputedStyle(document.documentElement);
    const foregroundRgb = rootStyle.getPropertyValue("--foreground-rgb").trim();
    setColorTheme(`rgb(${foregroundRgb})`);
  }, []);

  return <BarLoader color={colorTheme || "#000"} width={100} />;
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
      <div style={textStyle}>
        <p className="loader-text">Loading...</p>
      </div>
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
