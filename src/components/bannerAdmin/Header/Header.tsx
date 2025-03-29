import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

const Header = () => {
  const HEADER_LIST = [
    '진행 상태',
    '배너 노출 위치',
    '콘텐츠 유형',
    '광고 요청자',
    '시작날짜',
    '종료날짜',
  ];

  return (
    <StHeader>
      {HEADER_LIST.map((title) => (
        <h3 key={title}>{title}</h3>
      ))}
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1.5fr;

  padding: 1rem 1rem 1rem 3.9rem;

  align-items: center;
  justify-content: space-between;

  border-top: 1px solid ${colors.gray700};
  border-bottom: 1px solid ${colors.gray700};

  & > h3 {
    ${fontsObject.BODY_3_14_M}
    color: ${colors.gray100};
  }
`;
