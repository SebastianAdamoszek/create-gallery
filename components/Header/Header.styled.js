import styled from "styled-components";

export const Header = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: linear-gradient(
    to right,
    rgb(5, 5, 49),
    rgb(6, 11, 85),
    rgb(3, 12, 104)
  );
  padding: 10px 0;

  @media (min-width: 768px) {
    position: fixed;
    justify-content: end;
    gap: 1%;
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
