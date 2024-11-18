import styled from "styled-components";

export const AuthFormContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 10%;
  background-color: gray;
  z-index: 1000;
  width: 200px;
  padding: 0px 0px 10px 0px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;

  animation: incrase 0.5s ease-in-out;
  @keyframes incrase {
    0% {
      transform: scale(0.2);
    }
  }
  @media (min-width: 768px) {
    left: 41%;
  }
`;

export const HideFormButton = styled.div`
  position: absolute;
  top: -25px;
  right: 5px;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  font-size: 25px;
  cursor: url("/cursor-pointer.svg"), pointer;
  text-align: center;
  transform: rotate(-90deg);
`;

export const LogRegContainer = styled.div`
  display: flex;

  button {
    cursor: url("/cursor-pionter.svg") pointer;
    padding: 3px 0px;
    border: 3px solid gray;
    transition: 0.2s ease-in-out;
    text-align: center;
    width: 100px;

    &:hover {
      border: 3px solid darkgray;
      letter-spacing: 0.2px;
    }

    &:disabled {
      background-color: gray;
      color: gray;
      border: 3px solid gray;
      cursor: url("/icons8-cursor.svg"), auto;
      letter-spacing: normal;
    }
  }
`;

export const LogButton = styled.button`
  border-radius: 10px 2px 20px 0px;
`;

export const RegButton = styled.button`
  border-radius: 2px 10px 0px 20px;
`;

export const LogInGoogle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    border-radius: 10px;
  }

  button {
    cursor: url("/cursor-pointer.svg"), pointer;
    width: 135px;
    border-radius: 5px;
    padding: 3px 7px;
    border: none;
    font-weight: 500;
    transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
    background: linear-gradient(90deg, #4285f4, #ea4335, #fbbc05, #34a853);
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 5px;
      background: linear-gradient(-90deg, #4285f4, #ea4335, #fbbc05, #34a853);
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
      z-index: -1;
    }

    &:hover::before {
      opacity: 1;
    }

    &:hover {
      transform: scale(1.01);
      border: none;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  input {
    background-color: darkgray !important;
    border-radius: 5px;
    border: 1px solid black;
    padding: 1px 5px;
    letter-spacing: 1.1px;
    font-weight: 500;
    width: 170px;
  }
  input::placeholder {
    color: black;
  }

  button {
    cursor: url("/cursor-pointer.svg"), pointer;
    padding: 3px 25px;
    border: 3px solid darkgray;
    border-radius: 10px;
    transition: 0.2s ease-in-out;

    &:hover {
      border: 3px solid black;
      letter-spacing: 0.2px;
    }
  }
`;

export const ValidateError = styled.span`
  position: relative;
  top: 0px;
  left: 0px;
  padding: 2px 5px;
  border-radius: 5px;
  color: red;
  font-size: 10px;
  background-color: black;
`;

export const MinimizedFormButton = styled.button`
  position: absolute;
  top: 80px;
  right: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(70, 100, 255, 0.8),
    rgba(70, 100, 255, 0.3)
  );

  border: none;
  z-index: 1000;
  font-size: 35px;
  cursor: url("/cursor-pointer.svg"), pointer;
  transition: 0.2s ease-in-out;

  animation: slideForm 0.5s ease-in-out;
  @keyframes slideForm {
    0% {
      top: 80px;
      right: 50%;
    }
    80% {
      top: 80px;
      right: -5%;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 250, 0.5);
    font-size: 36px;
  }
`;
