import React, { useEffect, useMemo, useRef, useState } from 'react';

import PartFilter from '@/components/orgAdmin/PartFilter';
import {
  StLayout,
  StContent,
} from '@/components/orgAdmin/AboutTab/AboutTabManagement/style';
import TextField from '@/components/orgAdmin/TextField';
import ImageSelect from '@/components/orgAdmin/ImageSelect';
import { CoreValueInput } from '@/components/orgAdmin/AboutTab/AboutTabManagement/CoreValueInput';
import { useS3Upload } from '@/hooks/useS3Upload';
import { PartWithoutAll } from '@/components/orgAdmin/PartFilter';

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

const AboutTabManagement = () => {
  const [selectedPart, setSelectedPart] = useState<PartWithoutAll>('PLAN');
  const [image, setImage] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const curriculumInputRef = useRef<HTMLInputElement | null>(null);
  const [aboutSopt, setAboutSopt] = useState<AboutSopt>(initialAboutSopt);

  useEffect(() => {
    console.log(aboutSopt);
  }, [aboutSopt]);

  const handleBannerImageChange = async (e) => {
    if (!e.target.files) {
      return;
    }
    const image = await useS3Upload(e.target.files[0]);
    if (image !== null) {
      setAboutSopt((prevState) => ({
        ...prevState,
        bannerImage: image,
      }));
    }
  };

  const handleChangeImageByAboutSoptProperty = async (e) => {
    if (!e.target.files) {
      return;
    }
    // todo Ref 넣어서 수정
    const image = await useS3Upload(e.target.files[0]);

    if (image !== null) {
      setAboutSopt((prevState) => ({
        ...prevState,
        [getCurriculum]: image,
      }));
    }
  };

  const handleImageChange = (e) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
  };

  const getCurriculum = useMemo(() => {
    if (selectedPart === 'PLAN') {
      return 'planCurriculum';
    }
    if (selectedPart === 'DESIGN') {
      return 'designCurriculum';
    }
    if (selectedPart === 'ANDROID') {
      return 'androidCurriculum';
    }
    if (selectedPart === 'IOS') {
      return 'iosCurriculum';
    }
    if (selectedPart === 'WEB') {
      return 'webCurriculum';
    }
    if (selectedPart === 'SERVER') {
      return 'serverCurriculum';
    }
  }, [selectedPart]);

  const onChangePart = (part: PartWithoutAll) => {
    setSelectedPart(part);
  };

  const onHandleChangeByAboutSoptProperty = (key: keyof AboutSopt) => {
    return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setAboutSopt((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };
  };

  const onHandleChangeByCoreValueProperty = (
    index: number,
    key: keyof CoreValue,
  ) => {
    return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const coreValues = aboutSopt.coreValues.map(
        (coreValue, coreValueIndex) => {
          if (index !== coreValueIndex) {
            return coreValue;
          }
          return {
            ...coreValue,
            [key]: value,
          };
        },
      );

      setAboutSopt((prevState) => ({
        ...prevState,
        coreValues,
      }));
    };
  };

  return (
    <StLayout>
      <h1>ABOUT 탭</h1>
      <StContent>
        <h2>썸네일</h2>
        <p>image (1920 * 630)</p>
        <div className={'form_container'}>
          <ImageSelect
            image={aboutSopt.bannerImage}
            onChange={handleBannerImageChange}
            ref={bannerInputRef}
          />
        </div>

        <p>Title</p>
        <div className={'form_container'}>
          <TextField
            label={'ex. 32기 GO SOPT 소개'}
            value={aboutSopt.title}
            onChange={onHandleChangeByAboutSoptProperty('title')}
          />
        </div>
      </StContent>
      <StContent>
        <h2>핵심가치</h2>
        {aboutSopt.coreValues.map((coreValue, index) => {
          return (
            <>
              <p>image (380 * 380)</p>
              <CoreValueInput
                key={coreValue.id}
                coreValue={coreValue}
                onChange={handleImageChange}
                title={aboutSopt.coreValues[index].title}
                subTitle={aboutSopt.coreValues[index].subTitle}
                onHandleTitleChange={onHandleChangeByCoreValueProperty(
                  index,
                  'title',
                )}
                onHandleSubTitleChange={onHandleChangeByCoreValueProperty(
                  index,
                  'subTitle',
                )}
              />
            </>
          );
        })}
      </StContent>
      <StContent>
        <h2>모집파트 & 커리큘럼</h2>
        <div className={'form_container'}>
          <PartFilter selected={selectedPart} onChangePart={onChangePart} />
        </div>
        <p>image (1200 * 600)</p>
        <div className={'form_container'}>
          <ImageSelect
            image={aboutSopt[getCurriculum]}
            onChange={handleChangeImageByAboutSoptProperty}
            ref={curriculumInputRef}
          />
        </div>
      </StContent>
    </StLayout>
  );
};

export default AboutTabManagement;
