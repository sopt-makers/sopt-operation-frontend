import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StButtonWrapper,
  StEmptyNewsContent,
  StIconEdit,
  StIconTrash,
  StNewsDragHandle,
  StNewsEmptyItem,
} from '@/components/org/OrgAdmin/HomeSection/_components/News/style';

const EmptyItem = () => {
  return (
    <StNewsEmptyItem>
      <StNewsDragHandle type="button">
        <HandleIcon />
      </StNewsDragHandle>
      <StEmptyNewsContent>최신 소식을 추가해 보세요.</StEmptyNewsContent>
      <StButtonWrapper>
        <StIconEdit />
        <StIconTrash />
      </StButtonWrapper>
    </StNewsEmptyItem>
  );
};

export default EmptyItem;
