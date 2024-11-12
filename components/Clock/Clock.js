"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100); // Aktualizacja co 100 ms
    return () => clearInterval(interval);
  }, []);

  const getRotationStyle = (rotation) => ({
    transform: `rotate(${rotation}deg)`,
  });

  const calculateHourRotation = (hours, minutes) =>
    ((hours % 12) + minutes / 60) * 30;
  const calculateMinuteRotation = (minutes, seconds) =>
    (minutes + seconds / 60) * 6;
  const calculateSecondRotation = (seconds, milliseconds) =>
    (seconds + milliseconds / 1000) * 6;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  const hourRotation = calculateHourRotation(hours, minutes);
  const minuteRotation = calculateMinuteRotation(minutes, seconds);
  const secondRotation = calculateSecondRotation(seconds, milliseconds);

  return (
    <>
         <div
        style={{
          margin: "100px auto",
          // position: "absolute",
          // top: 70,
          // left: 0,
        }}
      >
      <Image
        src="/dial1.png"
        width={400}
        height={400}
        alt="Clock dial"
            />
 
        <div
          style={{
            position: "relative",
            top: "-301px",
            left: "100px",

            width: "200px",
            height: "200px",
            transform: "scale(2)",

            border: "5px double silver",
            borderRadius: "50%",
            backgroundImage:
              "linear-gradient(145deg, rgba(200, 200, 200, 0.3), rgba(255, 255, 255, 0.1))",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "23%",
              left: "50%",
              width: "4px",
              height: "50px",
              backgroundColor: "silver",
              transformOrigin: "bottom",
              ...getRotationStyle(hourRotation),
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "50%",
              width: "2px",
              height: "80px",
              backgroundColor: "silver",
              transformOrigin: "bottom",
              ...getRotationStyle(minuteRotation),
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "50%",
              width: "1px",
              height: "80px",
              backgroundColor: "red",
              transformOrigin: "bottom",
              ...getRotationStyle(secondRotation),
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "90px",
              left: "48.3%",
              width: "8px",
              height: "8px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
