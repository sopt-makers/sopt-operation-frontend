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
      onSuccess: () => queryClient.invalidateQueries(['banner', 'list']),
    });
  };

  return (
    <button onClick={handleBannerDelete}>
      <IcTrash />
    </button>
  );
};

export default DeleteBannerButton;
