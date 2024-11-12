"use client";
import React, { useEffect, useState } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100); // Aktualizacja co 100 ms
    return () => clearInterval(interval);
  }, []);

  const getRotationStyle = (rotation) => ({
    transform: `rotate(${rotation}deg)`
  });

  const calculateHourRotation = (hours, minutes) => ((hours % 12) + minutes / 60) * 30;
  const calculateMinuteRotation = (minutes, seconds) => (minutes + seconds / 60) * 6;
  const calculateSecondRotation = (seconds, milliseconds) => (seconds + milliseconds / 1000) * 6;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  const hourRotation = calculateHourRotation(hours, minutes);
  const minuteRotation = calculateMinuteRotation(minutes, seconds);
  const secondRotation = calculateSecondRotation(seconds, milliseconds);

  return (
    <div style={{transform: 'scale(2)', marginTop: '200px'}}>
 <div style={{
      position: 'relative',
      width: '200px',
      height: '200px',
      border: '5px double black',
      borderRadius: '50%',
      backgroundColor: 'rgba(0,0,0,0.7)' ,
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

    </div>
   
  );
};
