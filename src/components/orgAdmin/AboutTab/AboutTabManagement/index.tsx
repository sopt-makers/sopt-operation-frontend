import React, { ChangeEvent, useMemo, useState } from 'react';

import CoreValueInput from '@/components/orgAdmin/AboutTab/AboutTabManagement/CoreValueInput';
import {
  StAboutTabManagementContainer,
  StContent,
} from '@/components/orgAdmin/AboutTab/AboutTabManagement/style';
import ImageSelect from '@/components/orgAdmin/ImageSelect';
import PartFilter from '@/components/orgAdmin/PartFilter';
import { PartWithoutAll } from '@/components/orgAdmin/PartFilter';
import TextField from '@/components/orgAdmin/TextField';
import { putObject } from '@/utils/putObject';

interface Props {
  aboutSopt: AboutSopt;
  onHandleAboutSopt: (aboutSopt: AboutSopt) => void;
}

function AboutTabManagement({ aboutSopt, onHandleAboutSopt }: Props) {
  const [selectedPart, setSelectedPart] = useState<PartWithoutAll>('PLAN');

  const updateBannerImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }
    if (!files.length) {
      return;
    }

    const image = await putObject(files[0]);
    if (image !== null) {
      onHandleAboutSopt({ ...aboutSopt, bannerImage: image });
    }
  };

  const updateAboutSpotImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }
    if (!files.length) {
      return;
    }

    const image = await putObject(files[0]);

    if (image !== null) {
      onHandleAboutSopt({ ...aboutSopt, [getCurriculum as string]: image });
    }
  };

  const getCurriculum: keyof AboutSopt = useMemo(() => {
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
    throw new Error('invalid part');
  }, [selectedPart]);

  const onChangePart = (part: PartWithoutAll) => {
    setSelectedPart(part);
  };

  const handleBannerImage = (key: keyof AboutSopt) => {
    return ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
      onHandleAboutSopt({ ...aboutSopt, [key]: value });
    };
  };

  const handleCoreValueImageAtIndex = (index: number) => {
    return async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) {
        return;
      }
      if (!files.length) {
        return;
      }

      const image = await putObject(files[0]);

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

        onHandleAboutSopt({ ...aboutSopt, coreValues });
      }
    };
  };

  const handleUpdateCoreValueProperty = (
    index: number,
    key: keyof CoreValue,
  ) => {
    return ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
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

      onHandleAboutSopt({ ...aboutSopt, coreValues });
    };
  };

  return (
    <StAboutTabManagementContainer>
      <h1>ABOUT 탭</h1>
      <StContent>
        <h2>상단 배너</h2>
        <p>image (1920 * 630)</p>
        <div className={'form_container'}>
          <div className={'banner_image_container'}>
            <ImageSelect
              image={aboutSopt.bannerImage}
              onChange={updateBannerImage}
              onRemoveImage={() => {
                onHandleAboutSopt({ ...aboutSopt, bannerImage: '' });
              }}
              width={1920}
              height={630}
              priority
            />
          </div>
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
        <p> 브랜딩 메시지</p>
        <div className={'form_container'}>
          <TextField
            label={'ex. 32기 GO SOPT의 열정이 되어주세요!!!!!'}
            value={aboutSopt.coreDescription}
            onChange={handleBannerImage('coreDescription')}
          />
        </div>
        {aboutSopt.coreValues.map((coreValue, index) => {
          return (
            <CoreValueInput
              key={coreValue.id}
              image={aboutSopt.coreValues[index].imageUrl}
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
                onHandleAboutSopt({ ...aboutSopt, coreValues });
              }}
            />
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
          <div className={'curriculum_image_container'}>
            <ImageSelect
              image={aboutSopt[getCurriculum] as string}
              onChange={updateAboutSpotImage}
              onRemoveImage={() => {
                onHandleAboutSopt({
                  ...aboutSopt,
                  [getCurriculum as string]: '',
                });
              }}
              width={1200}
              height={600}
            />
          </div>
        </div>
      </StContent>
    </StAboutTabManagementContainer>
  );
}

export default AboutTabManagement;
