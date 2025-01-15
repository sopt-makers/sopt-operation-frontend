import { FieldBox, Radio, TextField } from '@sopt-makers/ui';

import Modal from '@/components/common/modal';
import ModalHeader from '@/components/common/modal/ModalHeader';

import { modalContentCss } from './style';

interface CreateBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBannerModal = (props: CreateBannerModalProps) => {
  const { isOpen, onClose } = props;

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalHeader title="신규 배너 등록" onClose={onClose} />
      <section css={modalContentCss}>
        <TextField labelText="배너 제목" required />
        <FieldBox
          topAddon={
            <FieldBox.TopAddon
              leftAddon={<FieldBox.Label label="콘텐츠 유형" required />}
            />
          }>
          <div className="radio-group">
            <Radio label="프로덕트 홍보" size="lg" />
            <Radio label="기타 홍보" size="lg" />
            <Radio label="생일 광고" size="lg" />
          </div>
        </FieldBox>
        <FieldBox
          topAddon={
            <FieldBox.TopAddon
              leftAddon={<FieldBox.Label label="노출 위치" required />}
            />
          }>
          <div className="radio-group">
            <Radio label="프로덕트 홍보" size="lg" />
            <Radio label="기타 홍보" size="lg" />
            <Radio label="생일 광고" size="lg" />
            <Radio label="생일 광고" size="lg" />
          </div>
        </FieldBox>
      </section>
    </Modal>
  );
};

export default CreateBannerModal;
