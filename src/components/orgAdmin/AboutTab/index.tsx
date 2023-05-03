import AboutTabManagement from '@/components/orgAdmin/AboutTab/AboutTabManagement';
import Footer from '@/components/common/Footer';
import AboutTabAction from '@/components/orgAdmin/AboutTab/AboutTabAction';
import { useEffect, useState } from 'react';
import { useGetAboutSopt, useUpdateAboutSopt } from '@/services/api/aboutSopt';
import { getBearerTokenAuthHeader } from '@/utils/auth';
import { SnackBar } from '@/components/orgAdmin/SnackBar';

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
  const semester = 32; // todo Generation 정보 받아오기
  const [aboutSopt, setAboutSopt] = useState<AboutSopt>(initialAboutSopt);
  const { data, isError, isLoading, error } = useGetAboutSopt(
    semester,
    getBearerTokenAuthHeader(),
  );
  const [snackBar, setSnackBar] = useState(false);
  const { mutate, isSuccess } = useUpdateAboutSopt(
    semester,
    aboutSopt,
    getBearerTokenAuthHeader(),
  );

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    setSnackBar(true);
    const timer = setTimeout(() => {
      setSnackBar(false);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  const onHandleAboutSopt = (aboutSopt: AboutSopt) => {
    setAboutSopt(aboutSopt);
  };

  useEffect(() => {
    if (data) {
      setAboutSopt(data);
    }
  }, [data]);

  if (isError) {
    return <div>{error?.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data && (
        <>
          <AboutTabManagement
            aboutSopt={aboutSopt}
            onHandleAboutSopt={onHandleAboutSopt}
          />
          <Footer>
            <AboutTabAction
              onClick={() => {
                mutate(aboutSopt);
              }}
            />
          </Footer>
        </>
      )}
      {snackBar && (
        <SnackBar
          onClose={() => {
            setSnackBar(false);
          }}>
          <div>저장 완료</div>
        </SnackBar>
      )}
    </>
  );
};

export default AboutTab;
