"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ClockWrapper,
  ClockConrainer,
  HourHand,
  MinuteHand,
  SecondHand,
  SecondHandTwo,
  Glass,
  PointCentre,
  Calendar,
  Line,
} from "./Clock.styled";
import { Loader } from "../Loader/Loader";

// Główny komponent zegara
export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState({ day: "", date: 0 });

  useEffect(() => {
    // Symulacja ładowania, na przykład na początku
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Możesz dostosować czas ładowania

    const interval = setInterval(() => {
      setTime(new Date());
    }, 100);

    // Pobranie aktualnej daty i dnia tygodnia
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    setCurrentDate({
      day: daysOfWeek[now.getDay()],
      date: now.getDate(),
    });

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
        <ClockWrapper>
          <ClockConrainer>
            <Image
              src="/cyferblat.png"
              width={400}
              height={400}
              alt="Clock dial"
            />
            <Glass>
              <HourHand rotation={hourRotation} />
              <MinuteHand rotation={minuteRotation} />
              <SecondHand rotation={secondRotation} />
              <SecondHandTwo rotation={secondRotation} />
              <PointCentre />
              <Calendar day={currentDate.day}>
                <span>{currentDate.day}</span>
                <Line>|</Line>
                <span>{currentDate.date}</span>
              </Calendar>
            </Glass>
          </ClockConrainer>
        </ClockWrapper>
      )}
    </>
  );
};
