import PartCategory from '../PartCategory';
import { StTitle, StTitleWrapper, StWrapper } from '../style';
import { StTextArea, StTextAreaWrapper } from './style';

const PartCurriculum = () => {
  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>파트별 커리귤럼</StTitle>
      </StTitleWrapper>
      <PartCategory />
      <StTextAreaWrapper>
        <StTextArea
          topAddon={{
            labelText: '기획 파트는 이런 걸 배워요.',
          }}
          value=""
          fixedHeight={230}
          maxHeight={230}
          placeholder="파트별 설명을 작성해주세요."
        />
        <StTextArea
          topAddon={{
            labelText: '이런 분이면 좋아요!',
          }}
          value=""
          fixedHeight={230}
          maxHeight={230}
          placeholder={`파트별 인재상을 작성해주세요.
ex.
- 어려움과 고민을 편하게 나누고 공감할 수 있는 유대감과 열린 마음을 가진 분
- 타 파트와 협업하며 존중과 신뢰를 바탕으로 원활한 팀워크를 만들어갈 수 있는 분`}
        />
      </StTextAreaWrapper>
    </StWrapper>
  );
};

export default PartCurriculum;
