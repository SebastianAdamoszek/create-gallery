import styled from "styled-components";

export const GalleryPageContainer = styled.div`
  margin: 10px auto;
  width: 100%;
  padding: 20px;
  @media (min-width: 768px) {
    margin: 80px auto;
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
