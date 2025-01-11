import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';

export const StCancelButton = styled(Button)`
  background-color: ${colors.gray600};
  color: ${colors.white};

  &:hover {
    color: ${colors.black};
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

export const StInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StLabel = styled.p`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.white};
`;

export const StRequiredIcon = styled.span`
  color: ${colors.secondary};
  margin-left: 4px;
`;

export const StDescription = styled.p`
  ${fontsObject.LABEL_4_12_SB};
  color: ${colors.gray300};

  padding-bottom: 5px;
`;
