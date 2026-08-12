'use client';

import { IconInfoCircle } from '@sopt-makers/icons';
import { Chip, TextArea } from '@sopt-makers/ui';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import { PARTS } from '@/components/org/OrgAdmin/HomeSection/constant';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StChipsContainer,
  StIcon,
  StSecondSectionContainer,
  StTitle,
  StWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';
import {
  StPartIntroductionModalWrapper,
  StPartIntroductionTextArea,
} from '@/components/org/OrgAdmin/RecruitSection/_components/PartIntroduction/style';
import {
  ERROR_MESSAGES,
  ONE_LINE_MAX_LENGTH,
  PREFERENCE_DEFAULT_COUNT,
} from '@/components/org/OrgAdmin/RecruitSection/_constants/constants';
import {
  StSectionWrapper,
  StTextAreaContainer,
  StTextAreaWrapper,
} from '@/components/org/OrgAdmin/RecruitSection/style';
import { PART_KO, PART_LIST } from '@/utils/org';

import { StPreferenceItem } from './style';

type PreferenceCounts = Record<PART_KO, number>;

const createDefaultPreferenceCounts = (): PreferenceCounts =>
  PART_LIST.reduce(
    (acc, part) => ({ ...acc, [part]: PREFERENCE_DEFAULT_COUNT }),
    {} as PreferenceCounts,
  );

type PartIntroSectionProps = {
  isEditable: boolean;
  restoreSignal: number;
  selectedPart: PART_KO;
  onChangePart: (id: PART_KO) => void;
};

const PartIntroSection = ({
  isEditable,
  restoreSignal,
  selectedPart,
  onChangePart,
}: PartIntroSectionProps) => {
  const { isInfoVisible, onInfoToggle } = useModal();
  const { data } = useAdminInfoQuery();

  const {
    register,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const oneLineFieldName = `partIntroduction${selectedPart}`;
  const contentFieldName = `recruitPartCurriculum.${selectedPart}.content`;
  const preferenceFieldName = `recruitPartCurriculum.${selectedPart}.preference`;

  const oneLineValue = watch(oneLineFieldName);
  const contentValue = watch(contentFieldName);
  const preferenceValue = watch(preferenceFieldName);

  const [preferenceCounts, setPreferenceCounts] = useState<PreferenceCounts>(
    createDefaultPreferenceCounts,
  );

  useEffect(() => {
    if (!data?.recruitPartCurriculum) return;

    const next = createDefaultPreferenceCounts();

    data.recruitPartCurriculum.forEach(({ part, introduction }) => {
      if (!part) return;

      const items = (introduction?.preference ?? '')
        .split('\n')
        .filter((item) => item.trim());
      const count = items.length
        ? Math.min(items.length, PREFERENCE_DEFAULT_COUNT)
        : PREFERENCE_DEFAULT_COUNT;
      next[part as PART_KO] = Math.max(count, PREFERENCE_DEFAULT_COUNT);
    });

    setPreferenceCounts(next);
  }, [data, restoreSignal]);

  const handleValidation = (field: string, value: string) => {
    if (value) {
      clearErrors(field);
    } else {
      setError(field, {
        type: 'required',
        message: ERROR_MESSAGES.required,
      });
    }
  };

  const handleOneLineValidation = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setError(oneLineFieldName, {
          type: 'required',
          message: ERROR_MESSAGES.required,
        });
        return;
      }

      if (value.length > ONE_LINE_MAX_LENGTH) {
        setError(oneLineFieldName, {
          type: 'maxLength',
          message: ERROR_MESSAGES.oneLine,
        });
        return;
      }

      clearErrors(oneLineFieldName);
    },
    [clearErrors, oneLineFieldName, setError],
  );

  useEffect(() => {
    if (typeof oneLineValue !== 'string') return;

    handleOneLineValidation(oneLineValue);
  }, [handleOneLineValidation, oneLineValue]);

  const preferenceCount = preferenceCounts[selectedPart];

  const preferenceItems = Array.from(
    { length: preferenceCount },
    (_, index) => (preferenceValue ?? '').split('\n')[index] ?? '',
  );

  const syncPreference = (items: string[]) => {
    const joined = items.join('\n');
    setValue(preferenceFieldName, joined);
    const hasEmptyItem = items.some((item) => !item.trim());
    handleValidation(preferenceFieldName, hasEmptyItem ? '' : joined);
  };

  const handleChangePreferenceItem = (index: number, value: string) => {
    const nextItems = [...preferenceItems];
    nextItems[index] = value;
    syncPreference(nextItems);
  };

  const textAreaContainerRef = useRef<HTMLDivElement>(null);
  const firstPreferenceRef = useRef<HTMLTextAreaElement>(null);

  // setValue로 채운 값은 onChange를 거치지 않아 자동 높이 계산이 안 되므로 직접 재계산
  useLayoutEffect(() => {
    const container = textAreaContainerRef.current;
    if (!container) return;

    container.querySelectorAll('textarea').forEach((textarea) => {
      textarea.style.height = '1px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, [selectedPart, oneLineValue, contentValue, preferenceValue]);

  const getActiveStatus = (id: PART_KO) => id === selectedPart;

  const handleSelectChip = (id: PART_KO) => {
    onChangePart(id);
  };

  const contentRegister = register(contentFieldName);
  const oneLineRegister = register(oneLineFieldName);

  return (
    <StSectionWrapper>
      <StSecondSectionContainer>
        <StTextAreaWrapper>
          <StWrapper>
            <StTitle>
              <span>파트별 소개</span>
              <StIcon onClick={onInfoToggle}>
                <IconInfoCircle />
              </StIcon>
            </StTitle>

            <StChipsContainer>
              {PARTS.map((part) => (
                <Chip
                  key={part}
                  active={getActiveStatus(part)}
                  onClick={() => handleSelectChip(part)}>
                  {part}
                </Chip>
              ))}
            </StChipsContainer>
          </StWrapper>

          <StTextAreaContainer ref={textAreaContainerRef}>
            <TextArea
              {...oneLineRegister}
              topAddon={{
                labelText: '파트 한줄 소개',
                descriptionText:
                  '파트를 한마디로 소개해 주세요. 라이팅 통일을 위해, 해요체를 사용해 주세요.',
              }}
              placeholder="ex. IT 프로덕트 기획 역량을 기르고, 팀을 이끄는 전반적인 매니징을 배워요."
              required
              disabled={!isEditable}
              maxHeight={9999}
              maxLength={ONE_LINE_MAX_LENGTH}
              value={oneLineValue ?? ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const { value } = e.currentTarget;

                setValue(oneLineFieldName, value, { shouldDirty: true });
                handleOneLineValidation(value);
              }}
              isError={!!(errors as any)[oneLineFieldName]}
              errorMessage={
                (errors as any)[oneLineFieldName]?.message as string
              }
            />
            <StPartIntroductionTextArea
              {...contentRegister}
              topAddon={{
                labelText: '이런 걸 배워요',
                descriptionText:
                  '파트에서 배우고 경험하는 내용을 자유롭게 소개해 주세요. 라이팅 통일을 위해, 해요체를 사용해 주세요.',
              }}
              placeholder="ex. 기획파트는 “어떤 서비스를 만들 것인가?”에서 시작해 “어떻게 사용자가 편하게 쓸 수 있을까?”까지 고민하는 파트예요. 사용자 니즈를 분석하고, 주요 기능과 화면 흐름을 설계하며, 개발/디자인 파트와 함께 프로젝트를 완성해 나가요!"
              required
              disabled={!isEditable}
              value={contentValue ?? ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const { value } = e.currentTarget;

                setValue(contentFieldName, value, { shouldDirty: true });
                handleValidation(contentFieldName, value);
              }}
              isError={
                !!(errors as any).recruitPartCurriculum?.[selectedPart]?.content
              }
              errorMessage={ERROR_MESSAGES.required}
              maxHeight={9999}
            />
            {preferenceItems.map((item, index) => (
              <StPreferenceItem key={index}>
                <StPartIntroductionTextArea
                  ref={index === 0 ? firstPreferenceRef : undefined}
                  topAddon={
                    index === 0
                      ? {
                          labelText: '이런 분이면 좋아요!',
                          descriptionText: '파트별 인재상을 작성해주세요.',
                        }
                      : undefined
                  }
                  placeholder="ex. 어려움과 고민을 편하게 나누고 공감할 수 있는 유대감과 열린 마음을 가진 분"
                  required
                  disabled={!isEditable}
                  value={item}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleChangePreferenceItem(index, e.currentTarget.value)
                  }
                  isError={
                    !item.trim() &&
                    !!(errors as any).recruitPartCurriculum?.[selectedPart]
                      ?.preference
                  }
                  errorMessage={
                    !item.trim()
                      ? ((errors as any).recruitPartCurriculum?.[selectedPart]
                          ?.preference?.message as string)
                      : undefined
                  }
                  maxHeight={9999}
                />
              </StPreferenceItem>
            ))}
          </StTextAreaContainer>
        </StTextAreaWrapper>
      </StSecondSectionContainer>

      <StPartIntroductionModalWrapper>
        <Modal
          title="파트별 소개"
          sections={[
            {
              description:
                '파트 한줄 소개는 메인 홈 ‘Part’ 섹션과 모집안내 탭에 사용돼요.',
              imgSrc: '/images/org/imgPartInfo1.png',
            },
            {
              description:
                '자세한 소개는 파트별 지원 안내 페이지에서 사용돼요.',
              imgSrc: '/images/org/imgPartInfo2.png',
            },
          ]}
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StPartIntroductionModalWrapper>
    </StSectionWrapper>
  );
};

export default PartIntroSection;
