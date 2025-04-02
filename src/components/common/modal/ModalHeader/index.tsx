import { IcModalClose } from '@/assets/icons';

import { StModalHeader } from './style';
import { ReactNode } from 'react';

interface Props {
  title: string;
  desc?: string;
  tag?: ReactNode;
  onClose: () => void;
}

function ModalHeader(props: Props) {
  const { title, desc, tag, onClose } = props;

  return (
    <StModalHeader>
      <div className="title">
        {tag && tag}
        <h1>{title}</h1>
        <h2>{desc}</h2>
      </div>
      <IcModalClose onClick={onClose} />
    </StModalHeader>
  );
}

export default ModalHeader;
