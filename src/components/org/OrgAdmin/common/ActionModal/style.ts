import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';

export const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 24px;

  & > h2 {
    ${fontsObject.TITLE_4_20_SB};
    color: ${colors.gray10};
  }

  & > p {
    ${fontsObject.BODY_2_16_R};
    color: ${colors.gray100};
    white-space: pre-line;
  }
`;

export const StModalBtnWrapper = styled.div`
  place-self: end;

  display: flex;
  gap: 12px;

  padding-top: 24px;
`;

export const StCancelButton = styled(Button)`
  background-color: ${colors.gray600};
  color: ${colors.white};

  &:hover {
    color: ${colors.black};
  }
`;

export const StActionButton = styled(Button)<{
  btntype: 'add' | 'delete' | 'deploy';
}>`
  color: ${(props) => (props.btntype === 'add' ? colors.black : colors.white)};

  background-color: ${(props) =>
    props.btntype === 'add' ? colors.white : colors.error};

  &:disabled {
    cursor: default;
  }
`;
