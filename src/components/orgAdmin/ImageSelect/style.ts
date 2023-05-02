import styled from '@emotion/styled';

export const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #858585;
  height: 20rem;
  width: 50rem;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

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
