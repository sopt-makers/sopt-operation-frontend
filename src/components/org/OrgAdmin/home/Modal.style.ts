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

export const StActionButton = styled(Button)<{ btnType: 'add' | 'delete' }>`
  color: ${(props) => (props.btnType === 'add' ? colors.black : colors.white)};

  background-color: ${(props) =>
    props.btnType === 'add' ? colors.white : colors.error};

  &:disabled {
    cursor: default;
  }
`;

export const StAddButton = styled(Button)`
  background-color: ${colors.white};
  color: ${colors.black};
`;

export const StAddModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;

  width: 500px;

  padding: 22px 32px 43px 32px;

  background-color: ${colors.gray900};
  border-radius: 12px;
`;

export const StAddModalBtnWrapper = styled.div`
  place-self: end;

  display: flex;
  gap: 12px;
`;
