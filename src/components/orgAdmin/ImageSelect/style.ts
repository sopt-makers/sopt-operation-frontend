import styled from '@emotion/styled';

interface StImageProps {
  hasImage: boolean;
}

export const StContainer = styled.form<StImageProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ hasImage }) => (hasImage ? '' : '2px dashed #858585')};
  width: 100%;
  height: 100%;
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
