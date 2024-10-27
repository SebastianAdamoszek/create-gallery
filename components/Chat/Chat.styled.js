import styled from "styled-components";

export const Container = styled.div``;

export const Messages = styled.div`
  padding: 2px 0 2px 5px;
  margin-top: 5px;
  overflow: auto;
  height: 300px;
  border: 1px solid black;
  background-color: darkgray;
  cursor: text;
`;

export const UserMessage = styled.div`
  p {
    font-size: 18px;
    font-weight: 700;
  }
  span {
    font-size: 12px;
    font-weight: 700;
    padding: 0 10px 0 0px;
  }
  p:hover {
    color: rgb(71, 71, 71);
    text-shadow: 4px 4px 3px rgba(240, 240, 240, 0.5);
    transform: scale(1.01);
  }
`;

export const Form = styled.form`
  position: relative;
  top: 5px;
  left: 5px;
`;
export const Input = styled.input`
  padding: 3px 7px;
  border-radius: 7px;
  background-color: rgb(46, 46, 46);
  color: rgb(240, 240, 240);
`;

export const Button = styled.button`
  margin-left: 20px;
  border-radius: 7px;
  padding: 3px 15px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: rgb(65, 65, 65);
  }
`;
