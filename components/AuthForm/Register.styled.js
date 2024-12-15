import styled from "styled-components";

export const RegisterContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.95);
  width: 100%;
  height: 100%;
  z-index: 110;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RegisterFormContainer = styled.div`
  background-color: gray;
  z-index: 1000;
  width: 200px;
  padding: 0px 0px 10px 0px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;

  animation: incrase 0.5s ease-in-out;
  @keyframes incrase {
    0% {
      transform: scale(0.2);
    }
  }
  @media (min-width: 768px) {
    left: 41%;
  }
`;
