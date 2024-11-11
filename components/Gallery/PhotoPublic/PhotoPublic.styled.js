import styled from "styled-components";

export const PhotoPublicWrapper = styled.div`
  /* position: relative; */
  width: 100%;
  width: 360px; /* Maksymalna szerokość dla zdjęcia */
  height: 200px;
  /* margin: 15px; */
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

   @media (min-width: 768px) {
    width: 350px; 
    height: 300px;
  }

  @media (min-width: 1024px) {
    width: 480px; 
    height: 400px;
  } 
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Utrzymuje proporcje i przycięcie */
    border-radius: 8px;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05); /* Powiększenie zdjęcia przy hover */
  }
`;
