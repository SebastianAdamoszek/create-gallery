import styled from "styled-components";

export const ClockConrainer = styled.div`
  margin: -100px 0 0 0;
  transform: scale(0.8);
  @media (min-width: 768px) {
    transform: scale(1);
    margin: 70px 0 0 0;
  }
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
    top: "23%",
    left: "50%",
    width: "4px",
    height: "50px",
    backgroundColor: "silver",
    transformOrigin: "bottom", // poprawiono: bez cudzysłowów
    transform: `rotate(${rotation}deg)`,
  };

  return <div style={style}></div>;
};

// Definiowanie komponentu MinuteHand
export const MinuteHand = ({ rotation }) => {
  const style = {
    position: "absolute",
    top: "7.5%",
    left: "50%",
    width: "2px",
    height: "80px",
    backgroundColor: "silver",
    transformOrigin: "bottom",
    transform: `rotate(${rotation}deg)`,
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
    transform: `rotate(${rotation}deg)`,
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
`;
