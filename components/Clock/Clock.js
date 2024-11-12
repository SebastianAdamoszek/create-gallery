"use client"
import React, { useEffect, useState } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRotationStyle = (rotation) => ({
    transform: `rotate(${rotation}deg)`
  });

  const calculateHourRotation = (hours, minutes) => ((hours % 12) + minutes / 60) * 30;
  const calculateMinuteRotation = (minutes, seconds) => (minutes + seconds / 60) * 6;
  const calculateSecondRotation = (seconds) => seconds * 6;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourRotation = calculateHourRotation(hours, minutes);
  const minuteRotation = calculateMinuteRotation(minutes, seconds);
  const secondRotation = calculateSecondRotation(seconds);

  return (
    <div style={{
      position: 'relative',
      width: '200px',
      height: '200px',
      border: '1px solid black',
      borderRadius: '50%',
    }}>
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        width: '4px',
        height: '50px',
        backgroundColor: 'black',
        transformOrigin: 'bottom',
        ...getRotationStyle(hourRotation),
      }}></div>

      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        width: '2px',
        height: '80px',
        backgroundColor: 'black',
        transformOrigin: 'bottom',
        ...getRotationStyle(minuteRotation),
      }}></div>

      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        width: '1px',
        height: '80px',
        backgroundColor: 'red',
        transformOrigin: 'bottom',
        ...getRotationStyle(secondRotation),
      }}></div>
    </div>
  );
};
