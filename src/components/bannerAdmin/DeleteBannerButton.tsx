import { DialogOptionType, useDialog, useToast } from '@sopt-makers/ui';
import { useQueryClient } from 'react-query';

import { IcTrash } from '@/assets/icons';
import { useDeleteBanner } from '@/services/api/banner/query';

interface DeleteBannerButtonProps {
  bannerId: number;
}

const DeleteBannerButton = ({ bannerId }: DeleteBannerButtonProps) => {
  const { mutate: deleteBannerMutate } = useDeleteBanner();

  const queryClient = useQueryClient();

  const handleBannerDelete = () => {
    deleteBannerMutate(bannerId, {
      onSuccess: () => {
        queryClient.invalidateQueries('bannerList');
        openToast({ icon: 'success', content: '배너가 삭제되었어요.' });
      },
      onError: () => {
        openToast({ icon: 'error', content: '배너 삭제에 실패했어요.' });
      },
    });
  };

  const { open: openToast } = useToast();
  const { open: openDialog } = useDialog();

  const option: DialogOptionType = {
    title: '배너를 삭제하실 건가요?',
    description: '삭제된 배너는 복구가 불가능해요.',
    type: 'danger',
    typeOptions: {
      cancelButtonText: '취소하기',
      approveButtonText: '삭제하기',
      buttonFunction: handleBannerDelete,
    },
  };

  return (
    <button onClick={() => openDialog(option)}>
      <IcTrash />
    </button>
  );
};

export default DeleteBannerButton;
