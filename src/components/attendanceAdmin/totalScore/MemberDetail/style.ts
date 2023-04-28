import styled from '@emotion/styled';

export const StModalWrap = styled.div`
  padding: 0 4rem 4rem 4rem;
  button.close-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 4.4rem;
    height: 4.4rem;
    background: none;
    margin: 3.2rem 3.2rem 0 0;
  }
  header {
    margin-top: 9.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 4rem;
    p {
      font-size: 1.6rem;
      line-height: 2.2rem;
      color: ${({ theme }) => theme.color.grayscale.gray80};
    }
    .member-name {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 3.4rem;
      color: ${({ theme }) => theme.color.grayscale.black80};
      span {
        color: ${({ theme }) => theme.color.main.purple100};
        margin-left: 0.8rem;
      }
    }
  }
  .list-head > table {
    border-spacing: 0;
  }
  .list-body {
    width: calc(100% + 8px);
    height: 36rem;
    overflow-y: scroll;
    padding-right: 5px;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.color.main.purple40};
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
  }
`;
