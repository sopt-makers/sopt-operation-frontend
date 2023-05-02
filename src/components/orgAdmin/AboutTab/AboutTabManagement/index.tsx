import React, { useEffect, useMemo, useState } from 'react';

import PartFilter from '@/components/orgAdmin/PartFilter';
import {
  StLayout,
  StContent,
} from '@/components/orgAdmin/AboutTab/AboutTabManagement/style';
import TextField from '@/components/orgAdmin/TextField';
import ImageSelect from '@/components/orgAdmin/ImageSelect';
import { CoreValueInput } from '@/components/orgAdmin/AboutTab/AboutTabManagement/CoreValueInput';
import { putObject } from '@/utils/putObject';
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
  const [aboutSopt, setAboutSopt] = useState<AboutSopt>(initialAboutSopt);

  useEffect(() => {
    console.log(aboutSopt);
  }, [aboutSopt]);

  const updateBannerImage = async (e) => {
    if (!e.target.files) {
      return;
    }
    const image = await putObject(e.target.files[0]);
    if (image !== null) {
      setAboutSopt((prevState) => ({
        ...prevState,
        bannerImage: image,
      }));
    }
  };

  const updateAboutSpotImage = async (e) => {
    if (!e.target.files) {
      return;
    }

    const image = await putObject(e.target.files[0]);

    if (image !== null) {
      setAboutSopt((prevState) => ({
        ...prevState,
        [getCurriculum]: image,
      }));
    }
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

  const handleBannerImage = (key: keyof AboutSopt) => {
    return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setAboutSopt((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };
  };

  const handleCoreValueImageAtIndex = (index: number) => {
    return async (e) => {
      if (!e.target.files) {
        return;
      }

      const image = await putObject(e.target.files[0]);

      if (image !== null) {
        const coreValues = aboutSopt.coreValues.map(
          (coreValue, coreValueIndex) => {
            if (index !== coreValueIndex) {
              return coreValue;
            }
            return {
              ...coreValue,
              imageUrl: image,
            };
          },
        );

        setAboutSopt((prevState) => ({
          ...prevState,
          coreValues,
        }));
      }
    };
  };

  const handleUpdateCoreValueProperty = (
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
            onChange={updateBannerImage}
            onRemoveImage={() => {
              setAboutSopt((prevState) => ({
                ...prevState,
                bannerImage: '',
              }));
            }}
          />
        </div>

        <p>Title</p>
        <div className={'form_container'}>
          <TextField
            label={'ex. 32기 GO SOPT 소개'}
            value={aboutSopt.title}
            onChange={handleBannerImage('title')}
          />
        </div>
      </StContent>
      <StContent>
        <h2>핵심가치</h2>
        {aboutSopt.coreValues.map((coreValue, index) => {
          return (
            <div key={coreValue.id}>
              <p>image (380 * 380)</p>
              <CoreValueInput
                image={aboutSopt.coreValues[index].imageUrl}
                coreValue={coreValue}
                onChange={handleCoreValueImageAtIndex(index)}
                title={aboutSopt.coreValues[index].title}
                subTitle={aboutSopt.coreValues[index].subTitle}
                onHandleTitleChange={handleUpdateCoreValueProperty(
                  index,
                  'title',
                )}
                onHandleSubTitleChange={handleUpdateCoreValueProperty(
                  index,
                  'subTitle',
                )}
                onRemoveImage={() => {
                  const coreValues = aboutSopt.coreValues.map(
                    (coreValue, coreValueIndex) => {
                      if (index !== coreValueIndex) {
                        return coreValue;
                      }
                      return {
                        ...coreValue,
                        imageUrl: '',
                      };
                    },
                  );
                  setAboutSopt((prevState) => ({
                    ...prevState,
                    coreValues,
                  }));
                }}
              />
            </div>
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
            onChange={updateAboutSpotImage}
            onRemoveImage={() => {
              setAboutSopt((prevState) => ({
                ...prevState,
                [getCurriculum]: '',
              }));
            }}
          />
        </div>
      </StContent>
    </StLayout>
  );
};

export default AboutTabManagement;
