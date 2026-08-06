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
  ChangeDialButton,
} from "./Clock.styled";
import { Loader } from "../Loader/Loader";

import dialsData from "./dials.json"; // Import danych z pliku JSON

// Główny komponent zegara
export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState({ day: "", date: 0 });

  useEffect(() => {
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

  const [dial, setDial] = useState(dialsData[0]); // Ustawienie początkowego dialu na pierwszy z danych

  const getNextIndex = () => {
    const currentIndex = dialsData.indexOf(dial);
    return (currentIndex + 1) % dialsData.length;
  };

  const changeDial = () => {
    const currentIndex = dialsData.indexOf(dial);
    const nextIndex = (currentIndex + 1) % dialsData.length;
    const newDial = dialsData[nextIndex];

    setDial(newDial);
    localStorage.setItem("selectedDial", newDial);
  };

  const nextDialImage = dialsData[getNextIndex()];

  useEffect(() => {
    const savedDial = localStorage.getItem("selectedDial");

    if (savedDial) {
      setDial(savedDial);
    }
  }, []);

  return (
    <>
      {loading && <Loader />}

      <ClockWrapper visible={visible}>
        <ClockConrainer>
          <Image
            src={dial}
            width={400}
            height={400}
            alt="Clock dial"
            priority
            onLoad={() => {
              setVisible(true);
              setLoading(false);
            }}
          />
          <Glass>
            <ChangeDialButton onClick={changeDial}>
              <Image
                src={nextDialImage}
                width={28}
                height={28}
                alt="Next dial preview"
                style={{ objectFit: "cover", borderRadius: "50%" }} // Przykładowe zaokrąglenie miniatury
              />
            </ChangeDialButton>

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
    </>
  );
};
