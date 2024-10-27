import styled from "styled-components";

export const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0px 5px 8px 8px;
  cursor: url("/cursor-pionter.svg") pointer;
`;

export const BtnDark = styled.button`
  background-color: rgb(240,240,240);
  border-radius: 5px;
  width: 20px;
  height: 10px;
  border: none;
`;

export const BtnLight = styled.button`
  background-color: rgb(100, 200, 200);
  border-radius: 5px;
  width: 20px;
  height: 10px;
  border: none;
`;

export const BtnOrange = styled.button`
  background-color: rgb(200, 200, 20);
  border-radius: 5px;
  width: 20px;
  height: 10px;
  border: none;
`;
