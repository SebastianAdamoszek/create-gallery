import styled from "styled-components";

export const GalleryPageContainer = styled.div`
  width: 100%;
  margin-top: -280px;
  @media (min-width: 768px) {
    margin-top: -200px;
  }
  h2 {
    text-align: center;
    padding: 20px 0;
  }
`;

export const GalleryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;

  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    gap: 25px;
  }
`;
