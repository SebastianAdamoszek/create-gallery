import styled from "styled-components";

export const QuickQuestionContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  z-index: 110;

  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const QuickQuestionContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: fixed;
margin: 20px 0;
  h2 {
    margin: 20px auto;
  }
`;

export const ButtonToHome = styled.button`
z-index: 100;
margin: 10px 0 20px 0;
padding: 10px;
border-radius: 10px;
`

export const ButtonsListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  button {
    width: 110px;
    padding: 5px 10px;
    border-radius: 10px;
  }
`;
export const ListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;

  p {
    width: 160px;
    text-align: center;
  }
`;

export const ListMore = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  color: green;
  text-align: left;

  li {
    width: 160px;
    display: flex;
    padding: 3px;
    span {
      color: green;
    }
  }
`;

export const ListLess = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  color: red;
  text-align: left;

  li {
    width: 160px;
    display: flex;
    padding: 3px;

    span {
      color: red;
    }
  }
`;
