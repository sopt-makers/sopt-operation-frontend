import styled from '@emotion/styled';

export const StAttendanceModal = styled.div`
  & > div {
    padding: 3.2rem 4rem 0 4rem;
  }
  .modal-header {
    margin-bottom: 4rem;
    h3 {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 140%;
      margin-bottom: 0.8rem;
    }
    p {
      font-size: 1.8rem;
      line-height: 140%;
      color: ${({ theme }) => theme.color.grayscale.gray80};
    }
  }
  .timer {
    text-align: center;
    font-size: 4.8rem;
    font-weight: 600;
    line-height: 140%;
    color: ${({ theme }) => theme.color.main.purple100};
    margin-bottom: 2rem;
    &-warn {
      color: ${({ theme }) => theme.color.sub.red};
    }
  }
  .code-wrapper {
    display: flex;
    justify-content: center;
    gap: 2.4rem;
    margin-bottom: 5.6rem;
    & > div {
      width: 8.2rem;
      height: 11.2rem;
      border-radius: 0.8rem;
      border: 2px solid ${({ theme }) => theme.color.main.purple100};
      display: flex;
      justify-content: center;
      align-items: center;
      & > p {
        color: ${({ theme }) => theme.color.main.purple100};
        font-size: 4rem;
        font-weight: 700;
      }
    }
  }
  .modal-footer {
    padding: 2.6rem 4rem;
    background: ${({ theme }) => theme.color.grayscale.gray20};
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 160%;
      color: ${({ theme }) => theme.color.sub.red};
    }
    button {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 100%;
      color: ${({ theme }) => theme.color.grayscale.white100};
      padding: 1.6rem 2.4rem;
      border-radius: 4rem;
      background-color: ${({ theme }) => theme.color.main.purple100};
    }
  }
`;
