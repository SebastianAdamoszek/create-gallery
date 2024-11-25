import styled from "styled-components";

export const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  padding: 0px 5px 8px 8px;
`;

export const BtnWhite = styled.button`
  background-color: rgb(240, 240, 240);
  /* border-radius: 5px; */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 20px;
  height: 8px;
  border: none;
`;

export const BtnLightTeal = styled.button`
  background-color: rgb(100, 200, 200);
  /* border-radius: 5px; */
  width: 20px;
  height: 8px;
  border: none;
`;

export const BtnOrange = styled.button`
  background-color: rgb(200, 200, 20);
  /* border-radius: 5px; */
  width: 20px;
  height: 8px;
  border: none;
`;

export const BtnHoney = styled.button`
  background-color: rgb(190, 150, 86);
  /* border-radius: 5px; */
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 20px;
  height: 8px;
  border: none;
`;
