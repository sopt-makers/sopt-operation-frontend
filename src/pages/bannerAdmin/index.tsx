import Header from '@/components/bannerAdmin/Header/Header';
import ListItem from '@/components/bannerAdmin/ListItem/ListItem';
import styled from '@emotion/styled';

const BannerAdminPage = () => {
  return (
    <>
      <StLayout>
        <Header />
        <StItemWrapper>
          <ListItem />
        </StItemWrapper>
      </StLayout>
    </>
  );
};

export default BannerAdminPage;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

const StItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
