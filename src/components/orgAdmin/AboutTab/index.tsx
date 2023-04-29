import AboutTabManagement from '@/components/orgAdmin/AboutTab/AboutTabManagement';
import Footer from '@/components/common/Footer';
import AboutTabAction from '@/components/orgAdmin/AboutTab/AboutTabAction';

const AboutTab = () => {
  return (
    <>
      <AboutTabManagement />
      <Footer>
        <AboutTabAction />
      </Footer>
    </>
  );
};

export default AboutTab;
