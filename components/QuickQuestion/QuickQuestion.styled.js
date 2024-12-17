import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10% 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 100;

  button {
    padding: 10px 25px;
    width: 110px;
    border-radius: 10px;
    border: 2px solid rgb(236, 225, 214);
    font-weight: bold;
    background: linear-gradient(
      135deg,
      rgba(48, 27, 10, 0.9),
      rgba(135, 77, 30, 0.9)
    );
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(135, 77, 30, 0.9),
        rgba(48, 27, 10, 0.9)
      );
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const InputContainer = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
border: 3px solid;
padding: 15px;
border-radius: 10px;
`
export const Input = styled.input`
   
    border: 3px solid;
    border-radius: 10px;
    padding: 5px;
    width: 230px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Info = styled.div`
  width: 300px;
  background-color: gray;
  border: 3px solid darkgray;
  border-radius: 8px;
  padding: 10px 0 10px 0;
  text-align: center;
`;
