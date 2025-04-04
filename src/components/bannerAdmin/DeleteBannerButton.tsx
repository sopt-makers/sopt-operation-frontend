import { useQueryClient } from 'react-query';

import { IcTrash } from '@/assets/icons';
import { useDeleteBanner } from '@/services/api/banner/query';
import { DialogOptionType, useDialog } from '@sopt-makers/ui';

interface DeleteBannerButtonProps {
  bannerId: number;
}

const DeleteBannerButton = ({ bannerId }: DeleteBannerButtonProps) => {
  const { mutate: deleteBannerMutate } = useDeleteBanner();

  const queryClient = useQueryClient();

  const handleBannerDelete = () => {
    deleteBannerMutate(bannerId, {
      onSuccess: () => queryClient.invalidateQueries('bannerList'),
    });
  };

  const { open } = useDialog();

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
    <button onClick={() => open(option)}>
      <IcTrash />
    </button>
  );
};

export default DeleteBannerButton;
