import styled from "styled-components";

export const Header = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background-color: rgba(12, 38, 124, 0.5);
  padding: 10px 0;

  @media (min-width: 768px) {
    position: fixed;
    justify-content: end;
    gap: 1%;
    background: linear-gradient(
    to right,
    #020321,
    #000326,
    #010429,
    #01042b,
    #030639,
    #020940
  )
  }
  @media (min-width: 960px) {
    gap: 6%;
  }
`;
export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  margin: 0 10px 0 0;

  @media (min-width: 768px) {
    gap: 5px;
    margin: 0 20px 0 0;
  }
`;
