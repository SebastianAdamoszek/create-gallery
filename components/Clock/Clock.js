"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ClockConrainer,
  HourHand,
  MinuteHand,
  SecondHand,
  Glass,
  PointCentre,
} from "./Clock.styled";
import { Loader } from "../Loader/Loader";

// Główny komponent zegara
export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Symulacja ładowania, na przykład na początku
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Możesz dostosować czas ładowania

    const interval = setInterval(() => {
      setTime(new Date());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  const hourRotation = ((hours % 12) + minutes / 60) * 30;
  const minuteRotation = (minutes + seconds / 60) * 6;
  const secondRotation = (seconds + milliseconds / 1000) * 6;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ClockConrainer>
          <Image src="/dial1.png" width={400} height={400} alt="Clock dial" />
          <Glass>
            <HourHand rotation={hourRotation} />
            <MinuteHand rotation={minuteRotation} />
            <SecondHand rotation={secondRotation} />
            <PointCentre />
          </Glass>
        </ClockConrainer>
      )}
    </>
  );
};
