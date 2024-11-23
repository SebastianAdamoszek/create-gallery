// Photo.styled.js

import styled from "styled-components";

// Zmieniona struktura kontenera zdjęcia i opisu
export const PhotoContainer = styled.div`
  position: relative;
  width: 100%;
  width: 350px;
  height: 350px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin: 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 450px;
    height: 400px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.5s ease;
  }
`;

export const Description = styled.textarea`
  width: 100%;
  padding: 5px;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  resize: none;
  height: 60px;
`;

export const ButtonSaveDesc = styled.button`
  width: 100%;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkgreen;
  }
`;

export const DescriptionTextWrapper = styled.div`
  width: 90%;
  height: 150px;
  overflow: auto;
`;

export const DescriptionText = styled.h4`
  margin-top: 10px;
  font-size: 18px;
  color: green;
  text-align: center;
  text-shadow: none;
  position: relative;
  z-index: 1;
`;

// Zmienione style dla przycisków usuwania i zaznaczania
export const PhotoDelWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  transition: all 0.3s ease;
  transform: ${({ $isMarked }) => ($isMarked ? "scale(0.9)" : "")};
  margin: 10px;

  img {
    border: ${({ $isMarked }) =>
      $isMarked ? "2px solid red" : "2px solid transparent"};
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const RemoveIcon = styled.div`
  display: ${({ $isMarked }) => ($isMarked ? "block" : "none")};
  position: absolute;
  top: 35px;
  right: 25px;
  color: red;
  cursor: pointer;
  font-size: 24px;
  z-index: 1;
  transition: transform 0.3s ease;
`;

export const CheckBox = styled.input`
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid red;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  &:checked {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const CheckIcon = styled.div`
  position: absolute;
  top: 5px;
  left: 7px;
  display: ${({ $isChecked }) => ($isChecked ? "block" : "none")};
  color: green;
  font-size: 18px;
`;
