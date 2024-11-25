import React from 'react';
import { RingLoader, CircleLoader, ClockLoader } from 'react-spinners';
// https://www.davidhu.io/react-spinners/
import "@/app/globals.css";

export const Loader = () => {
  return (
    <div style={loaderStyle} >
      <ClockLoader size={150} color="#3498db" loading={true} className="loader"/>
      <p className="loading-text">Loading...</p>
    </div>
  );
  
};

const loaderStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh', 
};
