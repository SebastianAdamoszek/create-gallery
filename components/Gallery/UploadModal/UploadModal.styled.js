import styled from "styled-components";

export const Modal = styled.div`
    position: fixed;
    top: 12%;
    left: 0;
    width: calc(100% - 30px);
    margin: 0 15px;
    padding: 10% 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:15px;
    z-index: 100;

    button {
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
    }
`