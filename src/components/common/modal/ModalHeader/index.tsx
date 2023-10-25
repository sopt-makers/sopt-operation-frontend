import { IcModalClose } from '@/assets/icons';

import { StModalHeader } from './style';

interface Props {
  title: string;
  desc: string;
}

function ModalHeader(props: Props) {
  const { title, desc } = props;

  return (
    <StModalHeader>
      <div className="title">
        <h1>{title}</h1>
        <h2>{desc}</h2>
      </div>
      <IcModalClose />
    </StModalHeader>
  );
}

export default ModalHeader;
