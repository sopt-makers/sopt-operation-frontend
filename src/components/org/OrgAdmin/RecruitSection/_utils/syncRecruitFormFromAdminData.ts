import type { FieldValues, UseFormSetValue } from 'react-hook-form';

import { FAQ_MAX_QUESTION_COUNT } from '@/utils/org';

type AdminInfoData = {
  partIntroduction?: { part?: string; description?: string }[];
  partCurriculum?: { part?: string; curriculums?: string[] }[];
  recruitPartCurriculum?: {
    part?: string;
    introduction?: { content?: string; preference?: string };
  }[];
  recruitQuestion?: {
    part?: string;
    questions?: { question?: string; answer?: string }[];
  }[];
};

const setValueOptions = { shouldDirty: false, shouldValidate: false };

export const syncRecruitFormFromAdminData = (
  data: AdminInfoData | undefined,
  setValue: UseFormSetValue<FieldValues>,
) => {
  if (!data) return;

  data.partIntroduction?.forEach(({ part, description }) => {
    if (!part) return;

    setValue(`partIntroduction${part}`, description ?? '', setValueOptions);
  });

  data.partCurriculum?.forEach(({ part, curriculums }) => {
    if (!part) return;

    curriculums?.forEach((curriculum, index) => {
      setValue(
        `partCurriculum.${part}.${index}`,
        curriculum ?? '',
        setValueOptions,
      );
    });
  });

  data.recruitPartCurriculum?.forEach(({ part, introduction }) => {
    if (!part) return;

    setValue(
      `recruitPartCurriculum.${part}.content`,
      introduction?.content ?? '',
      setValueOptions,
    );
    setValue(
      `recruitPartCurriculum.${part}.preference`,
      introduction?.preference ?? '',
      setValueOptions,
    );
  });

  data.recruitQuestion?.forEach(({ part, questions }) => {
    if (!part) return;

    // 서버에 없는 인덱스도 명시적으로 비워야 삭제된 질문이 폼에 남아있지 않음
    for (let index = 0; index < FAQ_MAX_QUESTION_COUNT; index += 1) {
      const qa = questions?.[index];

      setValue(
        `recruitQuestion.${part}.question${index}`,
        qa?.question ?? '',
        setValueOptions,
      );
      setValue(
        `recruitQuestion.${part}.answer${index}`,
        qa?.answer ?? '',
        setValueOptions,
      );
    }
  });
};
