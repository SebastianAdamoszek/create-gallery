import styled from "styled-components";

export const Header = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background-color: rgba(82, 52, 28, 0.7);
  padding: 10px 0;

  @media (min-width: 768px) {
    position: fixed;
    justify-content: end;
    gap: 1%;
    background-color: rgba(82, 52, 28, 0.7);
  }
  @media (min-width: 960px) {
    gap: 6%;
  }
  @media (min-width: 1920px) {
    justify-content: center;
  }
`;
export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  margin: 0 10px 0 0;

  @media (min-width: 768px) {
    width: max-content;
    gap: 5px;
    margin: 0;
  }
`;
