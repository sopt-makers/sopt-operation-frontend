import Header from '@/components/bannerAdmin/Header/Header';
import ListItem from '@/components/bannerAdmin/ListItem/ListItem';
import Tabs from '@/components/bannerAdmin/Tabs/Tabs';
import styled from '@emotion/styled';
const index = () => {
  return (
    <div>
      <Tabs />
      <StListWrapper>
        <Header />
        <StItemWrapper>
          <ListItem />
        </StItemWrapper>
      </StListWrapper>
    </div>
  );
};

export default index;

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
