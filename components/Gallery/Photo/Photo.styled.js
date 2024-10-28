import styled from "styled-components";

export const PhotoContainer = styled.div`
  position: relative;
  width: 300px; /* Stała szerokość */
  height: 200px; /* Stała wysokość */
  border-radius: 8px;
  border: 3px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
   
   @media (min-width: 768px) {
    width: 450px;
    height: 300px;
    border: 6px solid rgba(0, 0, 0, 0);

   }
   
`;
