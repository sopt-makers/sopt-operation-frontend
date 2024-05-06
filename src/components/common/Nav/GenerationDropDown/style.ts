import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StWrapper = styled.div`
  padding: 0 1.8rem 3.3rem 1.8rem;
`;

const GenerationContainer = styled.div`
  display: flex;
  gap: 1.4rem;
  padding: 1rem 0 1rem 1.2rem;
  border-radius: 1rem;

  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;

    & > h1 {
      display: flex;
      align-items: center;
      gap: 0.6rem;

      ${fontsObject.HEADING_7_16_B}
      color: ${colors.gray10};
    }
    & > h2 {
      ${fontsObject.LABEL_4_12_SB}
      color: ${colors.gray300};
    }
  }
`;

export const StSelectedGeneration = styled(GenerationContainer)`
  &:hover {
    background-color: ${colors.gray800};
  }
  &:active {
    background-color: ${colors.gray700};
  }

  & > svg > path > fill {
    border-radius: 0.7rem;
  }
`;

export const StDropdownGeneration = styled(GenerationContainer)`
  &:hover {
    background-color: ${colors.gray600};
  }
  &:active {
    background-color: ${colors.gray500};
  }
`;

export const StGenerationDropdown = styled.div`
  position: absolute;

  margin-top: 1rem;

  width: 17.6rem;
  height: auto;

  background-color: ${colors.gray700};

  border-radius: 1.3rem;
  box-shadow: 0px 5px 20px 0px rgba(63, 64, 66, 0.15);

  animation: appearDropdown 0.6s;

  @keyframes appearDropdown {
    from {
      opacity: 0;
      transform: translateY(-1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0rem);
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    padding: 0.8rem 0.7rem;
  }
`;
