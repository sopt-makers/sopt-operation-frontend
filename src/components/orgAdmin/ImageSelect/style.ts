import styled from '@emotion/styled';

export const StContainer = styled.div`
  height: 20rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  & > button {
    position: absolute;
    top: 3px;
    right: 3px;
    font-size: 1.4rem;
    background-color: transparent;
    border-radius: 50px;
    color: black;
    padding: 10px;
    transition: background-color 0.3s ease;
  }

  & > button:hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 50px;
    color: white;
  }
`;
