import PartCategory from '../PartCategory';
import { StTitle, StTitleWrapper, StWrapper } from '../style';
import { StFnaWrapper, StTextArea, StTextAreaWrapper } from './style';

const Fna = () => {
  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>자주 묻는 질문</StTitle>
      </StTitleWrapper>
      <PartCategory />
      <StTextAreaWrapper>
        <StFnaWrapper>
          <StTextArea
            topAddon={{
              labelText: '질문1',
            }}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
          />
          <StTextArea
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            topAddon={{
              labelText: '질문2',
            }}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
          />
          <StTextArea
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            topAddon={{
              labelText: '질문3',
            }}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
          />
          <StTextArea
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
          />
        </StFnaWrapper>
      </StTextAreaWrapper>
    </StWrapper>
  );
};

export default Fna;
