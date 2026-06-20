import { ToastOptionType } from '@sopt-makers/ui';

export const TOAST_OPTION: Record<'success' | 'error', ToastOptionType> = {
  success: { icon: 'success', content: '성공적으로 추가되었어요' },
  error: { icon: 'error', content: '추가에 실패했어요' },
};

export const EDIT_TOAST_OPTION: Record<'success' | 'error', ToastOptionType> = {
  success: { icon: 'success', content: '성공적으로 수정되었어요' },
  error: { icon: 'error', content: '수정에 실패했어요' },
};
