"use client";
// import { transform } from "next/dist/build/swc";
import styled from "styled-components";

export const ClockWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visible",
})`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  width: 500px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.9);

  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 700px;
    height: 700px;
  }
`;

export const ClockConrainer = styled.div`
  transform: scale(0.8);
  padding-top: 200px;

  @media (min-width: 768px) {
    transform: scale(1);
  }

  img {
    border-radius: 25px;
  }
`;

export const ChangeDialButton = styled.button`
  position: absolute;
  top: -20px;
  right: -40px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid black;

  box-shadow:
    inset 1px 1px 2px rgba(255, 255, 255, 0.8),
    inset -1px -1px 2px rgba(0, 0, 0, 0.3),
    0 2px 6px rgba(0, 0, 0, 0.4);
  cursor: hand;
  z-index: 5;

  &:hover {
    // background-color: rgba(255, 255, 255, 0.9);
    border: 2px solid silver;
  }
 display: flex;
  align-items: center;
  justify-content: center;   
`;

export const Glass = styled.div`
  position: relative;
  top: -301px;
  left: 100px;
  width: 200px;
  height: 200px;
  transform: scale(2);
  border: 5px double silver;
  border-radius: 50%;
  background-image: linear-gradient(
    145deg,
    rgba(200, 200, 200, 0.1),
    rgba(255, 255, 255, 0.1)
  );
`;

// Definiowanie komponentu HourHand
export const HourHand = ({ rotation }) => {
  const style = {
    position: "absolute",
    top: "24%",
    left: "49%",
    width: "0px",
    padding: "0.7px",
    border: "2.5px solid silver",
    height: "50px",
    backgroundColor: "rgba(0, 255, 0, 0.8)",
    transformOrigin: "bottom",
    transform: `rotate(${rotation}deg) translateY(4px)`,
    zIndex: "1",
    borderRadius: "1px",
  };

  return <div style={style}></div>;
};

// Definiowanie komponentu MinuteHand
export const MinuteHand = ({ rotation }) => {
  const style = {
    position: "absolute",
    top: "7.5%",
    left: "50%",
    width: "0px",
    padding: "0.25px",
    border: "1.75px solid silver",
    height: "80px",
    backgroundColor: "rgba(0, 255, 0, 0.8)",
    transformOrigin: "bottom",
    transform: `rotate(${rotation}deg) translateY(6px)`,
    zIndex: "2",
    borderRadius: "1px",
  };

  return <div style={style}></div>;
};

// Definiowanie komponentu SecondHand
export const SecondHand = ({ rotation }) => {
  const style = {
    position: "absolute",
    top: "7.5%",
    left: "50%",
    width: "1px",
    height: "80px",
    backgroundColor: "red",
    transformOrigin: "bottom",
    transform: `rotate(${rotation}deg) translateY(5px)`,
    zIndex: "3",
    borderRadius: "1px",
  };

  return <div style={style}></div>;
};

export const SecondHandTwo = ({ rotation }) => {
  const style = {
    position: "absolute",
    top: "44.2%",
    left: "50%",
    width: "2px",
    height: "10px",
    backgroundColor: "red",
    transformOrigin: "bottom",
    transform: `rotate(${rotation}deg) translateY(12px)`,
    zIndex: "3",
    borderRadius: "1px",
  };

  return <div style={style}></div>;
};

export const PointCentre = styled.div`
  position: absolute;
  top: 90px;
  left: 48.3%;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  z-index: 4;
`;

export const Calendar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40px;
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  color: ${(props) => (props.day === "Sun" ? "red" : "black")};
  position: absolute;
  top: 87.5px;
  left: 124px;
  background-color: white;
  line-height: 0;
  z-index: 0;
  padding: 5px 1px;
  border: 1px solid silver;
`;
export const Line = styled.span`
  font-weight: 100;
  font-size: 10px;
  color: silver;
`;
