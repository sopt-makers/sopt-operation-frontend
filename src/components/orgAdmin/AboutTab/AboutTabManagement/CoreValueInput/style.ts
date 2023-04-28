import styled from '@emotion/styled';

export const StCoreValueLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 2rem;

  & > .core_value_container {
    flex-direction: row;
    display: flex;
    align-items: start;
    width: 100%;

    & > .title_container {
      display: flex;
      padding-left: 1rem;
      flex-direction: column;
      width: 100%;

      & > .text {
        padding: 0.8rem 0.8rem 0.1rem 0.4rem;
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 20px;
        letter-spacing: -0.02em;

        color: ${({ theme }) => theme.color.grayscale.gray100};
      }

      & > .text_field_container {
        height: 5rem;
      }
    }
  }
`;
