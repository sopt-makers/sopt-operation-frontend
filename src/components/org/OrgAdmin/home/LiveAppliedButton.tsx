import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

interface LiveAppliedButtonProps {
  keyColor: string;
  subColor: string;
}

const LiveAppliedButton = ({ keyColor, subColor }: LiveAppliedButtonProps) => {
  return (
    <StContainer>
      <StExampleText>
        <StExample>&lt;예시&gt;</StExample>
        키컬러 #ffffff / 서브컬러 #ffffff
      </StExampleText>
      <StOrgButtonWrapper keyColor={keyColor} subColor={subColor}>
        35기 YB 지원하기
      </StOrgButtonWrapper>

      <StList>
        <StItem>
          · 모집기간이 종료되면, &apos;모집 알림 신청하기&apos;로 문구를
          변경해주세요.
        </StItem>
        <StItem>
          · 버튼 설정 내용은 메인 페이지 상단, 하단 버튼 모두에 반영돼요.
        </StItem>
      </StList>
    </StContainer>
  );
};

export default LiveAppliedButton;

export const BackgroundMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StExampleText = styled.p`
  ${fontsObject.BODY_3_14_M};
  color: ${colors.gray200};
`;

export const StExample = styled.span`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray10};

  padding-right: 10px;
`;

export const StOrgButtonWrapper = styled.button<{
  keyColor: string;
  subColor: string;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 62.01px;

  width: 176px;

  background: linear-gradient(
    274deg,
    ${(props) => props.keyColor},
    ${(props) => props.subColor},
    ${(props) => props.subColor}
  );
  background-size: 200% 200%;
  animation: ${BackgroundMove} 1.8s ease-out infinite alternate;

  padding: 9px 18px;

  color: ${colors.gray800};
  text-align: center;

  font-size: 17.54px;
  font-style: normal;
  font-weight: 600;
  line-height: 26.31px;

  &:hover {
    background: ${(props) => props.subColor};
  }
`;

export const StList = styled.ul`
  margin-top: 4px;
`;

export const StItem = styled.li`
  ${fontsObject.BODY_3_14_M};
  color: ${colors.gray200};
`;
