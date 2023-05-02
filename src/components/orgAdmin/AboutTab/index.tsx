import AboutTabManagement from '@/components/orgAdmin/AboutTab/AboutTabManagement';
import Footer from '@/components/common/Footer';
import AboutTabAction from '@/components/orgAdmin/AboutTab/AboutTabAction';
import { useEffect, useState } from 'react';
import { useGetAboutSopt } from '@/services/api/aboutSopt';
import { getBearerTokenAuthHeader } from '@/utils/auth';

const initialAboutSopt: AboutSopt = {
  id: 0,
  isPublished: false,
  title: '',
  bannerImage: '',
  coreDescription: '',
  planCurriculum: '',
  designCurriculum: '',
  androidCurriculum: '',
  iosCurriculum: '',
  webCurriculum: '',
  serverCurriculum: '',
  coreValues: [
    {
      id: 0,
      title: '',
      subTitle: '',
      imageUrl: '',
    },
    {
      id: 1,
      title: '',
      subTitle: '',
      imageUrl: '',
    },
    {
      id: 2,
      title: '',
      subTitle: '',
      imageUrl: '',
    },
  ],
};

const AboutTab = () => {
  const [aboutSopt, setAboutSopt] = useState<AboutSopt>(initialAboutSopt);
  const { data } = useGetAboutSopt(32, getBearerTokenAuthHeader());

  const onHandleAboutSopt = (aboutSopt: AboutSopt) => {
    setAboutSopt(aboutSopt);
  };
  useEffect(() => {
    if (data) {
      setAboutSopt(data);
    }
  }, [data]);
  return (
    <>
      <AboutTabManagement
        aboutSopt={aboutSopt}
        onHandleAboutSopt={onHandleAboutSopt}
      />
      <Footer>
        <AboutTabAction onClick={() => console.log('aboutSopt', aboutSopt)} />
      </Footer>
    </>
  );
};

export default AboutTab;
