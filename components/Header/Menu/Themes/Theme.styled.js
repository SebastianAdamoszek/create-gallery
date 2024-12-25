import styled from "styled-components";

export const ThemeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 49px;
  height: 49px;
  gap: 1px;
  margin-left: 20px;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 5px 8px 8px;
    height: auto;
    margin-left: 0px;
  }
`;

export const BtnWhite = styled.button`
  background-color: rgb(240, 240, 240);
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 3px;
  @media (min-width: 768px) {
    width: 20px;
    height: 8px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const BtnLightTeal = styled.button`
  background-color: rgb(100, 200, 200);
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 3px;

  @media (min-width: 768px) {
    width: 20px;
    height: 8px;
    border-radius: 0;
  }
`;

export const BtnOrange = styled.button`
  background-color: rgb(200, 200, 20);
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 3px;

  @media (min-width: 768px) {
    width: 20px;
    height: 8px;
    border-radius: 0;
  }
`;

export const BtnHoney = styled.button`
  background-color: rgb(190, 150, 86);
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 3px;

  @media (min-width: 768px) {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    width: 20px;
    height: 8px;
  }
`;
