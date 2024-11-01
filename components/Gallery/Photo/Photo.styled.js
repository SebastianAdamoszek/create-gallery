import styled from "styled-components";

export const PhotoContainer = styled.div`
  position: relative;
  width: 300px; /* Stała szerokość */
  height: 200px; /* Stała wysokość */
  border-radius: 8px;
  border: 3px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;

  img {
    animation: load-photo 0.5s ease-in-out;
  @keyframes load-photo {
    0% {
      transform: scale(0.1);
      transform-origin: 100% 0%;
    }
  }
  }

  @media (min-width: 768px) {
    width: 450px;
    height: 300px;
    border: 6px solid rgba(0, 0, 0, 0);
  }
`;
