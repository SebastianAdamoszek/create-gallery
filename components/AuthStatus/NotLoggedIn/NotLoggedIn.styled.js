import styled from "styled-components";

export const Icon = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5),
    rgba(100, 100, 100, 0.2)
  );
  width: 80px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 17px;
  transition: 0.2s ease-in-out;
  cursor: url("/cursor-pointer.svg"), pointer;
  p {
    font-size: 12px;
    text-align: center;
    line-height: 1;
    padding: 0px 0 9px 0;
  }

  &:hover {
    transform: scale(1.03);
    background-color: rgba(150, 150, 150, 0.6);
  }
`;
