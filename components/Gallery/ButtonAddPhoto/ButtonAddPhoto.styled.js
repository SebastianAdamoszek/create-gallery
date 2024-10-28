import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  left: 70%;
  top: 0;
  padding: 10px 25px;  
  width: 100px;
  border-radius: 10px;
  border: none; 
  font-weight: bold;  
  background: linear-gradient(135deg, #6a11cb, #2575fc);  
  cursor: pointer; 
  transition: background 0.3s ease, transform 0.3s ease; 

  &:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb); 
    transform: scale(1.05); 
  }

  &:active {
    transform: scale(0.95); 
  }
`;
