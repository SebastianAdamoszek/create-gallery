import styled from "styled-components";

export const GalleryPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    text-align: center;
    padding: 20px 0 5px 0;
  }
  h3 {
    text-align: center;
    font-size: 16px;
    overflow-wrap: break-word;
    width: 300px;
  }
  @media (min-width: 768px) {
    margin-top: 0;
    h2 {
      font-size: 22px;
    }
    h3 {
      font-size: 18px;
      width: 430px;
    }
  }
`;

export const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
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
