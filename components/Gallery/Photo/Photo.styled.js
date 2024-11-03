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
export const PhotoDelWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  transition: all 0.3s ease;
  transform: ${({ isMarked }) => (isMarked ? "scale(0.9)" : "")};

  animation: load-del-photo 0.5s ease-in-out;
  @keyframes load-del-photo {
    0% {
      transform: scale(0.1);
      transform-origin: 50% 50%;
    }
    90% {
      opacity: 0;
    }
  }

  img {
    border: ${({ isMarked }) =>
      isMarked ? "2px solid red" : "2px solid transparent"};
    border-radius: ${({ isMarked }) => (isMarked ? "8px" : "12px")};
    transition: all 0.3s ease;
  }
`;

export const RemoveIcon = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  color: red;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  /* transform: ${({ isMarked }) => (isMarked ? "scale(1)" : "scale(0)")}; */
  opacity: ${({ isMarked }) => (isMarked ? "1" : "0")};
  font-size: 24px;
  z-index: 1;
`;

export const ButtonDel = styled.label`
  position: relative;
  bottom: 100px;
  left: 0;
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 4px 6px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 10px;

  &:hover {
    background-color: #ff4500;
  }
`;

export const CheckBox = styled.input`
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid red;
  border-radius: 4px;
  /* background-color: ${({ checked }) => (checked ? "" : "transparent")}; */
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  &:checked {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export const CheckIcon = styled.div`
  position: relative;
  bottom: 96px;
  left: 8px;
  display: ${({ isChecked }) => (isChecked ? "block" : "none")};
  color: green;
  font-size: 14px;
`;
