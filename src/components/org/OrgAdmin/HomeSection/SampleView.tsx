import { colors } from '@sopt-makers/colors';
import { IconInfoCircle } from '@sopt-makers/icons';
import Image, { StaticImageData } from 'next/image';

import { IcModalClose } from '@/assets/icons';
import {
  StDescription,
  StDescription2,
  StImgTitle,
  StImgWrapper,
  StImgWrapperTitle,
} from '@/components/org/OrgAdmin/HomeSection/style';

interface SampleViewProps {
  category: string;
  title: string;
  description: string;
  src: StaticImageData;
}

const SampleView = ({ category, title, description, src }: SampleViewProps) => {
  return (
    <StImgWrapper>
      <StImgWrapperTitle>
        <StImgTitle>
          <IconInfoCircle color={colors.white} />
          {category}
        </StImgTitle>
        <IcModalClose />
      </StImgWrapperTitle>
      <StDescription>{title}</StDescription>
      <StDescription2>{description}</StDescription2>
      <Image src={src} alt="파트별 소개 이미지" />
    </StImgWrapper>
  );
};

export default SampleView;
