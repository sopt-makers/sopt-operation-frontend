import { IcModalClose } from '@/assets/icons';

import { StModalHeader } from './style';

interface Props {
  title: string;
  desc: string;
  onClose: () => void;
}

function ModalHeader(props: Props) {
  const { title, desc, onClose } = props;

  return (
    <StModalHeader>
      <div className="title">
        <h1>{title}</h1>
        <h2>{desc}</h2>
      </div>
      <IcModalClose onClick={onClose} />
    </StModalHeader>
  );
}

export default ModalHeader;
