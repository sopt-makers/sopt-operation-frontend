import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

import { HEADER_LIST } from '@/constants';

const Header = () => {
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
  grid-template-columns: 1fr 1.2fr 1fr 1fr 1fr 1.2fr 0.8fr;

  padding: 1rem 0;

  align-items: center;
  justify-content: space-between;

  text-align: center;

  border-top: 1px solid ${colors.gray700};
  border-bottom: 1px solid ${colors.gray700};

  & > h3 {
    text-align: center;

    ${fontsObject.BODY_3_14_M};
    color: ${colors.gray100};

    white-space: nowrap;
  }

  & > h3:nth-child(1) {
    margin-left: 3.9rem;
    text-align: left;
  }

  & > h3:nth-child(6) {
    margin-left: 5rem;
    text-align: left;
  }
`;
