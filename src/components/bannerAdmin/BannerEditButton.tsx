import { IcEdit } from '@/assets/icons';

interface BannerEditButtonProps {
  onEditModalOpen: (bannerId: number) => void;
  bannerId: number;
}

const BannerEditButton = ({
  onEditModalOpen,
  bannerId,
}: BannerEditButtonProps) => {
  const handleEditClick = () => {
    onEditModalOpen(bannerId);
  };

  return (
    <button onClick={handleEditClick}>
      <IcEdit />
    </button>
  );
};

export default BannerEditButton;
