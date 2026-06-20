import { ToastOptionType } from '@sopt-makers/ui';

import { ReviewForm } from '@/components/org/OrgAdmin/HomeSection/_types/types';

export const TOAST_OPTION: Record<'success' | 'error', ToastOptionType> = {
  success: { icon: 'success', content: '성공적으로 추가되었어요' },
  error: { icon: 'error', content: '추가에 실패했어요' },
};

export const EDIT_TOAST_OPTION: Record<'success' | 'error', ToastOptionType> = {
  success: { icon: 'success', content: '성공적으로 수정되었어요' },
  error: { icon: 'error', content: '수정에 실패했어요' },
};

export const DELETE_TOAST_OPTION: Record<'success' | 'error', ToastOptionType> =
  {
    success: { icon: 'success', content: '성공적으로 삭제되었어요' },
    error: { icon: 'error', content: '삭제에 실패했어요' },
  };

export const REVIEW_CONTENT_MIN_HEIGHT = 104;
export const REVIEW_CONTENT_MAX_HEIGHT = 220;

export const EMPTY_REVIEW: ReviewForm = {
  title: '',
  content: '',
  authorInfo: '',
};
