import { IcEdit } from '@/assets/icons';
import { useQueryClient } from 'react-query';

interface BannerEditButtonProps {
  onEditModalOpen: (bannerId: number) => void;
  bannerId: number;
}

const BannerEditButton = ({
  onEditModalOpen,
  bannerId,
}: BannerEditButtonProps) => {
  const queryClient = useQueryClient();
  const handleEditClick = () => {
    onEditModalOpen(bannerId);
    queryClient.invalidateQueries(['banner', 'detail']);
  };

  return (
    <button onClick={handleEditClick}>
      <IcEdit />
    </button>
  );
};

export default BannerEditButton;
