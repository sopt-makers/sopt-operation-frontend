import Header from '@/components/bannerAdmin/Header/Header';
import ListItem from '@/components/bannerAdmin/ListItem/ListItem';
import Tabs from '@/components/bannerAdmin/Tabs/Tabs';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
const index = () => {
  return (
    <StWrapper>
      <StTitle>광고 배너 관리</StTitle>
      <Tabs />
      <StListWrapper>
        <Header />
        <StItemWrapper>
          <ListItem />
        </StItemWrapper>
      </StListWrapper>
    </StWrapper>
  );
};

export default index;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4.9rem;
`;

const StTitle = styled.h1`
  color: ${colors.white};

  ${fontsObject.TITLE_1_32_SB}
`;

const StListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

const StItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
