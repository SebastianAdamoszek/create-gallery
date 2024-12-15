import styled from "styled-components";

export const QuickQuestionContainer = styled.div`
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

export const QuickQuestionContent = styled.div`
  position: fixed;
  h2 {
    margin: 20px auto;
  }
`;
export const ButtonsListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  button {
    width: 110px;
    padding: 5px 10px;
    border-radius: 10px;
  }
`;
export const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;

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
