import styled from '@emotion/styled';

export const StTextBox = styled.div`
  background-color: ${({ theme }) => theme.color.main.newBlue};
  padding: 15px 20px;
  border-radius: 10px;

  p {
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
    white-space: pre-line;
    color: ${({ theme }) => theme.color.grayscale.white100};
  }
`;

export const StContent = styled.div`
  width: max-content;

  .triangle {
    width: 0px;
    height: 0px;
    border-top: 12px solid ${({ theme }) => theme.color.main.newBlue};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    margin-left: 76%;
  }
`;
