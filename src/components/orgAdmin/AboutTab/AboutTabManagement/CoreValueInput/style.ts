import styled from '@emotion/styled';

export const StCoreValueInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;

  & > p {
    padding-bottom: 2rem;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 20px;
    letter-spacing: -0.02em;
  }

  & > .core_value_container {
    flex-direction: row;
    display: flex;
    align-items: start;
    width: 100%;

    & > .core_value_logo_container {
      width: 40%;
      height: 240px;
    }
  }
`;

export const StTextFieldContainer = styled.div`
  height: 100%;
`;

export const StTitleContainer = styled.div`
  display: flex;
  padding-left: 1rem;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const StMainTitleContainer = styled.div`
  height: 30%;
`;

export const StSubTitleContainer = styled.div`
  height: 70%;
`;

export const StTypography = styled.p`
  padding: 0.8rem 0.8rem 0.1rem 0.4rem;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 20px;
  letter-spacing: -0.02em;
`;
