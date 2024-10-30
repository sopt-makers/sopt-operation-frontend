import CoreValue from './CoreValue';
import Curriculum from './Curriculum';
import Executives from './Executives';
import HeaderBanner from './HeaderBanner';
import { StContainer } from './style';

const AboutSection = () => {
  return (
    <StContainer>
      <HeaderBanner />
      <CoreValue />
      <Curriculum />
      <Executives />
    </StContainer>
  );
};

export default AboutSection;
