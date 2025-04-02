import { HEADER_LIST } from '@/constants';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;

  padding: 1rem 0;

  align-items: center;
  justify-content: space-between;

  text-align: center;

  border-top: 1px solid ${colors.gray700};
  border-bottom: 1px solid ${colors.gray700};

  & > h3 {
    margin-left: 3.9rem;
    text-align: left;

    ${fontsObject.BODY_3_14_M};
    color: ${colors.gray100};

    white-space: nowrap;
  }

  & > h3:nth-of-type(6) {
    margin-left: 1rem;

    text-align: left;
  }
`;
